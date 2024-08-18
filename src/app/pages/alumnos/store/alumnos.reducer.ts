import { createFeature, createReducer, on } from '@ngrx/store';
import { AlumnosActions } from './alumnos.actions';
import { Alumno } from '../../../core/interfaces/alumno';


export const alumnosFeatureKey = 'alumnos';


export interface State {
  isLoading: boolean;
  alumnos: Alumno[];
  error: unknown;
}

export const initialState: State = {
  isLoading: false,
  alumnos: [],
  error: ""
};

export const reducer = createReducer(
  initialState,
  on(AlumnosActions.loadAlumnoss, state => ({ ...state, isLoading: true })),

  on(AlumnosActions.loadAlumnossSuccess, (state, action) => ({ ...state, isLoading: false, alumnos: action.data })),

  on(AlumnosActions.loadAlumnossFailure, (state, action) => ({ ...state, isLoading: false, error: action.error })),

  // ADD Alumnos
  on(AlumnosActions.addAlumno, state => ({ ...state, isLoading: true, })),

  on(AlumnosActions.addAlumnoSuccess, (state, action) => ({ ...state, isLoading: false, alumnos: [...state.alumnos, action.data], })),

  on(AlumnosActions.addAlumnoFailure, (state, action) => ({ ...state, isLoading: false, error: action.error, })),


  // Edit Alumnos
  on(AlumnosActions.editAlumno, state => ({ ...state, isLoading: true, })),

  on(AlumnosActions.editAlumnoSuccess, (state, action) => ({ ...state, isLoading: false, alumnos: [...state.alumnos, action.data] })),

  on(AlumnosActions.editAlumnoFailure, (state, action) => ({ ...state, isLoading: false, error: action.error, })),

  // Delete Alumnos
  on(AlumnosActions.deleteAlumnoss, state => ({ ...state, isLoading: true, })),

  on(AlumnosActions.deleteAlumnossSuccess, (state, action) => ({ ...state, isLoading: false, alumnos: state.alumnos.filter((s) => s.id !== action.data.id), })),

  on(AlumnosActions.deleteAlumnossFailure, (state, action) => ({ ...state, isLoading: false, error: action.error, })),
);

export const alumnosFeature = createFeature({
  name: alumnosFeatureKey,
  reducer,
});

