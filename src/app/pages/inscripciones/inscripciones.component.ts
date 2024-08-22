import { Component, OnInit, ElementRef } from '@angular/core';
import { concat, concatMap, map, Observable } from 'rxjs';
import { Course } from '../../core/interfaces/course';
import { Alumno } from '../../core/interfaces/alumno';

import { Store } from '@ngrx/store';

import { selectCourses, selectIsLoading } from '../cursos/store/cursos.selectors';
import { selectAlumnos } from '../alumnos/store/alumnos.selectors';
import { CursosActions } from '../cursos/store/cursos.actions';
import { AlumnosActions } from '../alumnos/store/alumnos.actions';

import { InscripcionesActions } from './store/inscripciones.actions';
import { MatDialog } from '@angular/material/dialog';
import { EnrollmentDialogComponent } from './enrollment-dialog/enrollment-dialog.component';
import { selectEnrollments } from './store/inscripciones.selectors';
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

  studentsEnrollments: any = [];
  selectCourse: Course[] = [];
  courseId: string = '';

  constructor(private store: Store, private matdialog: MatDialog, private elRef: ElementRef) {
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
    this.courseId = course.id;

    course.enrollments?.forEach(enrollment => {
      this.alumnos$.pipe(
        map((students: Alumno[]) =>
          students.find(student => student.id == enrollment.studentId)
        )
      ).subscribe(student => {
        if (student) {
          this.studentsEnrollments.push({ enrollmentId: enrollment.id, student: student });
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


  deleteEnrollement(enrollmentId: string) {
    if (confirm('Estas seguro de eliminar el registro?')) {
      this.store.dispatch(InscripcionesActions.deleteInscripciones({ enrollmentId }));
      this.elRef.nativeElement.querySelector('#' + enrollmentId).remove();
      // this.studentsEnrollments.filter(e => e.enrollmentId !== enrollmentId);
    }
  }
}
