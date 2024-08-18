import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Course } from '../../../core/interfaces/course';

export const CursosActions = createActionGroup({
  source: 'Cursos',
  events: {
    'Load Cursos': emptyProps(),
    'Load Cursos Success': props<{ data: Course[] }>(),
    'Load Cursos Failure': props<{ error: unknown }>(),

    'Add Cursos': props<{ curso: Course }>(),
    'Add Cursos Success': props<{ data: Course }>(),
    'Add Cursos Failure': props<{ error: unknown }>(),

    'Edit Cursos': props<{ id: string, coursesUpdate: Course }>(),
    'Edit Cursos Success': props<{ data: Course }>(),
    'Edit Cursos Failure': props<{ error: unknown }>(),

    'Delete Cursos': props<{ id: string }>(),
    'Delete Cursos Success': props<{ data: Course }>(),
    'Delete Cursos Failure': props<{ error: unknown }>(),
  }
});
