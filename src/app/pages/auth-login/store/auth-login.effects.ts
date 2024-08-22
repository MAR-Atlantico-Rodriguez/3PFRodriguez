import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { AuthLoginActions } from './auth-login.actions';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';



@Injectable()
export class AuthLoginEffects {

  loadAuthLogins$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthLoginActions.loadAuthLogins),
      concatMap((action) =>
        this.authService.login(action.email, action.password).pipe(
          map(data => {
            this.router.navigate(['']);
            return AuthLoginActions.loadAuthLoginsSuccess({ data })
          }),
          catchError(error => of(AuthLoginActions.loadAuthLoginsFailure({ error }))))
      )
    );
  });


  constructor(private actions$: Actions, private authService: AuthService, private router: Router) { }
}
