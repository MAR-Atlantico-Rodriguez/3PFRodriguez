import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Alumno } from '../../../core/interfaces/alumno';

export const AlumnosActions = createActionGroup({
  source: 'Alumnos',
  events: {
    'Load Alumnoss': emptyProps(),
    'Load Alumnoss Success': props<{ data: Alumno[] }>(),
    'Load Alumnoss Failure': props<{ error: unknown }>(),

    'Add Alumno': props<{ alumno: Alumno }>(),
    'Add Alumno Success': props<{ data: Alumno }>(),
    'Add Alumno Failure': props<{ error: unknown }>(),

    'Edit Alumno': props<{ id: string, alumnoUpdate: Alumno }>(),

    'Edit Alumno Success': props<{ data: Alumno }>(),
    'Edit Alumno Failure': props<{ error: unknown }>(),

    'Delete Alumnoss': props<{ id: string }>(),
    'Delete Alumnoss Success': props<{ data: Alumno }>(),
    'Delete Alumnoss Failure': props<{ error: unknown }>(),
  }
});
