import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { CursosActions } from './cursos.actions';
import { CoursesService } from '../../../core/services/courses.service';


@Injectable()
export class CursosEffects {

  loadCourses$ = createEffect(() => {
    return this.actions$.pipe(
      // Filtramos de todas las acciones solo, las que son de tipo EnrollmentsActions.loadEnrollments
      ofType(CursosActions.loadCursos),
      // Luego concatenamos un nuevo observable
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        // Reemplazamos el EMPTY por nuestro propio OBS que se encarga de ir a buscar la data a la DB
        this.cursoService.getCourses().pipe(
          // Manejar una respuesta satisfactoria
          map((data) => CursosActions.loadCursosSuccess({ data })),

          // Manejar una respuesta con error
          catchError((error) =>
            of(CursosActions.loadCursosFailure({ error }))
          )
        )
      )
    );
  });

  addCourses$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CursosActions.addCursos),
      concatMap((action) =>
        this.cursoService.addCourse(action.curso).pipe(
          map((data) => CursosActions.addCursosSuccess({ data })),
          catchError((error) =>
            of(CursosActions.addCursosFailure({ error }))
          )
        )
      )
    );
  });

  editCourses$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CursosActions.editCursos),
      concatMap((action) =>
        this.cursoService.editCourseById(action.id, action.coursesUpdate).pipe(
          map((data) => CursosActions.loadCursos()),
          catchError((error) =>
            of(CursosActions.editCursosFailure({ error }))
          )
        )
      )
    );
  });


  deleteCourses$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(CursosActions.deleteCursos),

      concatMap((action) =>
        this.cursoService.deleteCourseById(action.id).pipe(
          map((data) => CursosActions.deleteCursosSuccess({ data })),
          catchError((error) =>
            of(CursosActions.deleteCursosFailure({ error }))
          )
        )
      )
    );
  });



  constructor(private actions$: Actions, private cursoService: CoursesService) { }
}
