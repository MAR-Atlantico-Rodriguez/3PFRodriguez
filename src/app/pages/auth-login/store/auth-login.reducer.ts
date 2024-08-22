import { createFeature, createReducer, on } from '@ngrx/store';
import { AuthLoginActions } from './auth-login.actions';
import { UserRole } from '../../../core/interfaces/user';

export const authLoginFeatureKey = 'authLogin';

export interface State {
  isLoading: Boolean;
  role: UserRole | String;
  username: String;
  token: String;
  error: String | null
}

export const initialState: State = {
  isLoading: false,
  role: "EMPLOYEE",
  username: '',
  token: '',
  error: null
};

export const reducer = createReducer(
  initialState,
  on(AuthLoginActions.loadAuthLogins, (state) => ({
    ...state,
    isLoading: true,
    error: null
  })),
  on(AuthLoginActions.loadAuthLoginsSuccess, (state, data) => ({
    ...state,
    isLoading: false,
    role: data.data.role,
    username: data.data.username,
    token: data.data.token,
  })),
  on(AuthLoginActions.loadAuthLoginsFailure, (state, action) => state),

);

export const authLoginFeature = createFeature({
  name: authLoginFeatureKey,
  reducer,
});

