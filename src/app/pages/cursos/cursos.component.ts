import { Component } from '@angular/core';
import { Course } from '../../core/interfaces/course';
import { MatDialog } from '@angular/material/dialog';
import { CoursesService } from '../../core/services/courses.service';
import { CourseDialogComponent } from './course-dialog/course-dialog.component';
import { generateId } from '../../core/utils';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.scss'
})
export class CursosComponent {
  nombreCurso = '';

  displayedColumns: string[] = [
    'id',
    'name',
    'startDate',
    'endDate',
    'actions',
  ];

  dataSource: any = [];

  isLoading = false;

  constructor(
    private matDialog: MatDialog,
    private coursesService: CoursesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses() {
    this.isLoading = true;
    this.coursesService.getCourses().subscribe({
      next: (data) => {
        this.dataSource = data;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
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
          this.isLoading = true;
          this.coursesService.addCourse(value)
            .pipe(tap(() => this.loadCourses()))
            .subscribe({
              complete: () => {
                this.isLoading = false;
              },
            });
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
            this.coursesService
              .editCourseById(editingCourse.id, value)
              .pipe(tap(() => this.loadCourses()))
              .subscribe({
                complete: () => this.isLoading = false
              });
          }
        },
      });
  }

  deleteCourseById(id: string) {
    if (confirm('Esta seguro?')) {
      this.isLoading = true;

      this.coursesService.deleteCourseById(id)
        .pipe(tap(() => this.loadCourses()))
        .subscribe({
          complete: () => {
            this.isLoading = false;
          },
        });
    }
  }
}