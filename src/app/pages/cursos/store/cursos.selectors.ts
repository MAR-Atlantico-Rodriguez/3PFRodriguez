import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCursos from './cursos.reducer';

export const selectCursosState = createFeatureSelector<fromCursos.State>(
  fromCursos.cursosFeatureKey
);

export const selectCourses = createSelector(
  selectCursosState,
  (state) => state.courses
);

export const selectIsLoading = createSelector(
  selectCursosState,
  (state) => state.isLoading
);