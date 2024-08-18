import { createFeature, createReducer, on } from '@ngrx/store';
import { CursosActions } from './cursos.actions';
import { Course } from '../../../core/interfaces/course';

export const cursosFeatureKey = 'cursos';

export interface State {
  isLoading: boolean;
  courses: Course[];
  error: unknown;
}

export const initialState: State = {
  isLoading: false,
  courses: [],
  error: ""
};

export const reducer = createReducer(
  initialState,
  on(CursosActions.loadCursos, state => ({ ...state, isLoading: true })),

  on(CursosActions.loadCursosSuccess, (state, action) => ({ ...state, isLoading: false, courses: action.data })),

  on(CursosActions.loadCursosFailure, (state, action) => ({ ...state, isLoading: false, error: action.error })),

  // ADD Alumnos
  on(CursosActions.addCursos, state => ({ ...state, isLoading: true, })),

  on(CursosActions.addCursosSuccess, (state, action) => ({ ...state, isLoading: false, courses: [...state.courses, action.data], })),

  on(CursosActions.addCursosFailure, (state, action) => ({ ...state, isLoading: false, error: action.error, })),


  // Edit Alumnos
  on(CursosActions.editCursos, state => ({ ...state, isLoading: true, })),

  on(CursosActions.editCursosSuccess, (state, action) => ({ ...state, isLoading: false, courses: [...state.courses, action.data] })),

  on(CursosActions.editCursosFailure, (state, action) => ({ ...state, isLoading: false, error: action.error, })),

  // Delete Alumnos
  on(CursosActions.deleteCursos, state => ({ ...state, isLoading: true, })),

  on(CursosActions.deleteCursosSuccess, (state, action) => ({ ...state, isLoading: false, courses: state.courses.filter((s) => s.id !== action.data.id), })),

  on(CursosActions.deleteCursosFailure, (state, action) => ({ ...state, isLoading: false, error: action.error, })),
);

export const cursosFeature = createFeature({
  name: cursosFeatureKey,
  reducer,
});

