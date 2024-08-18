import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of, concat } from 'rxjs';
import { AlumnosActions } from './alumnos.actions';
import { AlumnosService } from '../../../core/services/alumnos.service';


@Injectable()
export class AlumnosEffects {

  loadAlumnos$ = createEffect(() => {
    return this.actions$.pipe(
      // Filtramos de todas las acciones solo, las que son de tipo EnrollmentsActions.loadEnrollments
      ofType(AlumnosActions.loadAlumnoss),
      // Luego concatenamos un nuevo observable
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        // Reemplazamos el EMPTY por nuestro propio OBS que se encarga de ir a buscar la data a la DB
        this.alumnoService.getAlumnos().pipe(
          // Manejar una respuesta satisfactoria
          map((data) => AlumnosActions.loadAlumnossSuccess({ data })),

          // Manejar una respuesta con error
          catchError((error) =>
            of(AlumnosActions.loadAlumnossFailure({ error }))
          )
        )
      )
    );
  });

  addAlumnos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AlumnosActions.addAlumno),
      concatMap((action) =>
        this.alumnoService.addAlumnos(action.alumno).pipe(
          map((data) => AlumnosActions.addAlumnoSuccess({ data })),
          catchError((error) =>
            of(AlumnosActions.addAlumnoFailure({ error }))
          )
        )
      )
    );
  });

  editAlumnos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AlumnosActions.editAlumno),
      concatMap((action) =>
        this.alumnoService.editAlumno(action.id, action.alumnoUpdate).pipe(
          map((data) => AlumnosActions.loadAlumnoss()),
          catchError((error) =>
            of(AlumnosActions.editAlumnoFailure({ error }))
          )
        )
      )
    );
  });


  deleteAlumnos$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(AlumnosActions.deleteAlumnoss),

      concatMap((action) =>
        this.alumnoService.deleteAlumnosById(action.id).pipe(
          map((data) => AlumnosActions.deleteAlumnossSuccess({ data })),
          catchError((error) =>
            of(AlumnosActions.deleteAlumnossFailure({ error }))
          )
        )
      )
    );
  });


  constructor(private actions$: Actions, private alumnoService: AlumnosService) { }
}
