import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAlumnos from './alumnos.reducer';

export const selectAlumnosState = createFeatureSelector<fromAlumnos.State>(
  fromAlumnos.alumnosFeatureKey
);


export const selectAlumnos = createSelector(
  selectAlumnosState,
  (state) => state.alumnos
);

export const selectIsLoading = createSelector(
  selectAlumnosState,
  (state) => state.isLoading
);