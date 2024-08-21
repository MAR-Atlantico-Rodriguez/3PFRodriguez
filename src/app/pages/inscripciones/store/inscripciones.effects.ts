import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { InscripcionesActions } from './inscripciones.actions';
import { EnrollmentsService } from '../../../core/services/enrollments.service';
import { CoursesService } from '../../../core/services/courses.service';
import { CursosActions } from '../../cursos/store/cursos.actions';


@Injectable()
export class InscripcionesEffects {

  loadInscripcioness$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscripcionesActions.loadInscripciones),
      concatMap((action) =>
        this.enrollmentsService.getCourseEnrollments(action.id).pipe(
          map(data => InscripcionesActions.loadInscripcionesSuccess({ data })),
          catchError(error => of(InscripcionesActions.loadInscripcionesFailure({ error }))))
      )
    );
  });

  addInscripcioness$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscripcionesActions.addInscripciones),
      concatMap((action) =>
        this.enrollmentsService.addEnrollment(action.payload).pipe(
          map(data => InscripcionesActions.addInscripcionesSuccess({ data })),
          catchError(error => of(InscripcionesActions.addInscripcionesFailure({ error }))))
      )
    );
  });


  constructor(private actions$: Actions, private enrollmentsService: EnrollmentsService, private course: CoursesService) { }
}
