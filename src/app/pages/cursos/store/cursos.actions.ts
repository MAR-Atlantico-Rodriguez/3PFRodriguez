import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const CursosActions = createActionGroup({
  source: 'Cursos',
  events: {
    'Load Cursoss': emptyProps(),
    'Load Cursoss Success': props<{ data: unknown }>(),
    'Load Cursoss Failure': props<{ error: unknown }>(),
  }
});
