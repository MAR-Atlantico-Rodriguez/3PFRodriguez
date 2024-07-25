import { Inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

export const roleGuard: CanActivateFn = (route, state) => {
  const router = Inject(Router);
  const authService = Inject(AuthService);

  return authService.verifyToken().pipe(
    map((isAuthenticate) => {
      isAuthenticate ? true : router.createUrlTree(['authLogin']);
    })
  );
};
