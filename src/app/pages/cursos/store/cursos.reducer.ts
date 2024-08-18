import { createFeature, createReducer, on } from '@ngrx/store';
import { CursosActions } from './cursos.actions';

export const cursosFeatureKey = 'cursos';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,
  on(CursosActions.loadCursoss, state => state),
  on(CursosActions.loadCursossSuccess, (state, action) => state),
  on(CursosActions.loadCursossFailure, (state, action) => state),
);

export const cursosFeature = createFeature({
  name: cursosFeatureKey,
  reducer,
});

