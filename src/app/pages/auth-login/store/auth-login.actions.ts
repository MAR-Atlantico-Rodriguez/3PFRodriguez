import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User, UserLogin, UserRole } from '../../../core/interfaces/user';

export const AuthLoginActions = createActionGroup({
  source: 'AuthLogin',
  events: {
    'Load AuthLogins': props<{ email: string; password: string }>(),
    'Load AuthLogins Success': props<{ data: UserLogin }>(),
    'Load AuthLogins Failure': props<{ error: unknown }>(),
  }
});
