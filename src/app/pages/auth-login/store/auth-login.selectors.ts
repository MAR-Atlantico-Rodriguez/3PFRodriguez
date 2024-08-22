import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuthLogin from './auth-login.reducer';

export const selectAuthLoginState = createFeatureSelector<fromAuthLogin.State>(
  fromAuthLogin.authLoginFeatureKey
);

export const selectUsername = createSelector(
  selectAuthLoginState,
  (state) => state.username
);

export const selectIsLoadingAuth = createSelector(
  selectAuthLoginState,
  (state) => state.isLoading
);

export const selectRole = createSelector(
  selectAuthLoginState,
  (state) => state.role
);