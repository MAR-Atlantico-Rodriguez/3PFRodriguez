import { createActionGroup, props } from '@ngrx/store';
import { Enrollment } from '../../../core/interfaces/enrollment';
import { Course } from '../../../core/interfaces/course';


export const InscripcionesActions = createActionGroup({
  source: 'Inscripciones',
  events: {
    'Load Inscripciones': props<{ id: string }>(),
    'Load Inscripciones Success': props<{ data: Course[] }>(),
    'Load Inscripciones Failure': props<{ error: unknown }>(),

    'Add Inscripciones': props<{ payload: Enrollment }>(),
    'Add Inscripciones Success': props<{ data: Enrollment }>(),
    'Add Inscripciones Failure': props<{ error: unknown }>(),

    'Delete Inscripciones': props<{ enrollmentId: string }>(),
    'Delete Inscripciones Success': props<{ data: Enrollment }>(),
    'Delete Inscripciones Failure': props<{ error: unknown }>(),
  }
});
