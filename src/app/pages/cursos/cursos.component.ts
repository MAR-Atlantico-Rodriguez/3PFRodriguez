import { Component } from '@angular/core';
import { Course } from '../../core/interfaces/course';
import { MatDialog } from '@angular/material/dialog';
import { CoursesService } from '../../core/services/courses.service';
import { CourseDialogComponent } from './course-dialog/course-dialog.component';
import { generateId } from '../../core/utils';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { CursosActions } from './store/cursos.actions';
import { selectCourses, selectIsLoading } from './store/cursos.selectors';
import { selectRole } from '../auth-login/store/auth-login.selectors';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.scss'
})
export class CursosComponent {
  nombreCurso = '';

  displayedColumns: string[] = ['id', 'name', 'startDate', 'endDate', 'actions',];
  isLoading$: Observable<boolean>;
  dataSource$: Observable<Course[]>;
  role$: Observable<String>;

  constructor(private matDialog: MatDialog, private coursesService: CoursesService, private router: Router, private store: Store) {
    this.dataSource$ = this.store.select(selectCourses);
    this.isLoading$ = this.store.select(selectIsLoading);
    this.role$ = this.store.select(selectRole);
  }

  ngOnInit(): void {
    this.store.dispatch(CursosActions.loadCursos());
  }

  openDialog(): void {
    this.matDialog
      .open(CourseDialogComponent)
      .afterClosed()
      .subscribe({
        next: (value) => {
          // console.log('RECIBIMOS ESTE VALOR: ', value);

          this.nombreCurso = value.name;

          value['id'] = generateId(5);
          this.store.dispatch(CursosActions.addCursos({ curso: value }));
        },
      });
  }

  viewClases(id: String) {
    this.router.navigate(['clases', id])
  }

  editCourse(editingCourse: Course) {
    this.matDialog
      .open(CourseDialogComponent, { data: editingCourse })
      .afterClosed()
      .subscribe({
        next: (value) => {
          if (!!value) {
            this.store.dispatch(CursosActions.editCursos({ id: editingCourse.id, coursesUpdate: value }));
          }
        },
      });
  }

  deleteCourseById(id: string) {
    if (confirm('Esta seguro?')) {
      this.store.dispatch(CursosActions.deleteCursos({ id }));
    }
  }
}