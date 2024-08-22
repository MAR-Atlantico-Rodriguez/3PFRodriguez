import { createFeature, createReducer, on } from '@ngrx/store';
import { InscripcionesActions } from './inscripciones.actions';
import { Course } from '../../../core/interfaces/course';
import { Alumno } from '../../../core/interfaces/alumno';

export const inscripcionesFeatureKey = 'inscripciones';

export interface State {
  courses: Course[];
  students: Alumno[];
  isLoading: boolean;

}

export const initialState: State = {
  isLoading: false,
  courses: [],
  students: []
};

export const reducer = createReducer(
  initialState,
  on(InscripcionesActions.loadInscripciones, state => ({ ...state, isLoading: true })),
  on(InscripcionesActions.loadInscripcionesSuccess, (state, action) => ({ ...state, isLoading: false })),
  on(InscripcionesActions.loadInscripcionesFailure, (state, action) => state),

  on(InscripcionesActions.deleteInscripciones, state => ({ ...state, isLoading: true })),
  on(InscripcionesActions.deleteInscripcionesSuccess, (state, action) => ({ ...state, isLoading: false })),
  on(InscripcionesActions.deleteInscripcionesFailure, (state, action) => ({ ...state, error: action.error })),
);

export const inscripcionesFeature = createFeature({
  name: inscripcionesFeatureKey,
  reducer,
});

