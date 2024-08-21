import { Component, OnInit } from '@angular/core';
import { concat, concatMap, map, Observable } from 'rxjs';
import { Course } from '../../core/interfaces/course';
import { Alumno } from '../../core/interfaces/alumno';

import { Store } from '@ngrx/store';

import { selectCourses, selectIsLoading } from '../cursos/store/cursos.selectors';
import { selectAlumnos, selectIsLoadingAlumno } from '../alumnos/store/alumnos.selectors';
import { CursosActions } from '../cursos/store/cursos.actions';
import { AlumnosActions } from '../alumnos/store/alumnos.actions';
import { Enrollment } from '../../core/interfaces/enrollment';
import { InscripcionesActions } from './store/inscripciones.actions';
import { MatDialog } from '@angular/material/dialog';
import { EnrollmentDialogComponent } from './enrollment-dialog/enrollment-dialog.component';
import { selectEnrollments, selectInscripcionesState } from './store/inscripciones.selectors';
import { generateId } from '../../core/utils';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrl: './inscripciones.component.scss'
})
export class InscripcionesComponent implements OnInit {

  courses$: Observable<Course[]>;
  alumnos$: Observable<Alumno[]>;
  enrollmentsStudents$: Observable<Alumno[]>;
  isLoadingCourses$: Observable<boolean>;
  // isLoadingAlumnos$: Observable<boolean>;
  // isLoadingEnrollments$: Observable<boolean>;

  studentsEnrollments: Alumno[] = [];
  selectCourse: Course[] = [];

  constructor(private store: Store, private matdialog: MatDialog) {
    this.courses$ = this.store.select(selectCourses);
    this.alumnos$ = this.store.select(selectAlumnos);

    this.enrollmentsStudents$ = this.store.select(selectEnrollments);

    this.isLoadingCourses$ = this.store.select(selectIsLoading);
    // this.isLoadingAlumnos$ = this.store.select(selectIsLoadingAlumno);

  }

  ngOnInit(): void {
    this.store.dispatch(CursosActions.loadCursos());
    this.store.dispatch(AlumnosActions.loadAlumnoss());
  }


  studentsCourse(course: Course) {
    this.studentsEnrollments = [];
    this.selectCourse = [];
    this.selectCourse.push(course);

    course.enrollments?.forEach(enrollment => {
      this.alumnos$.pipe(
        map((students: Alumno[]) =>
          students.find(student => student.id == enrollment.studentId)
        )
      ).subscribe(student => {
        if (student) {
          this.studentsEnrollments.push(student);
        }
      });
    });
  }


  addStudenCourse() {
    this.matdialog
      .open(EnrollmentDialogComponent)
      .afterClosed()
      .subscribe({
        next: (value) => {
          let id = generateId(5);
          this.store.dispatch(InscripcionesActions.addInscripciones({
            payload: {
              id: id,
              courseId: this.selectCourse[0].id,
              studentId: value.studentId,
            },
          }));

        },
        complete: () => this.store.dispatch(CursosActions.loadCursos())

      });
  }
}
