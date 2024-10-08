import { createFeatureSelector, createSelector, select } from '@ngrx/store';
import * as fromInscripciones from './inscripciones.reducer';

export const selectInscripcionesState = createFeatureSelector<fromInscripciones.State>(
  fromInscripciones.inscripcionesFeatureKey
);

export const selectEnrollments = createSelector(
  selectInscripcionesState,
  (state) => state.students
);