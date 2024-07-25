import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private VALID_TOKEN = "TOKEN-Login123123asdasd"
  private FAKE_USER: User = {
    id: 1,
    name: "Martin Rodriguez",
    email: "martin@martin.com",
    password: "123456",
    role: "EMPLOYEE",
  }

  private _authUser$ = new BehaviorSubject<User | null>(null);
  authUser$ = this._authUser$.asObservable();

  constructor(private router: Router) { }

  login() {
    this._authUser$.next(this.FAKE_USER);
    localStorage.setItem('token', this.VALID_TOKEN);
    this.router.navigate(['']);
  }

  logout() {
    this._authUser$.next(null);
    localStorage.removeItem('token');
    this.router.navigate(['authLogin']);
  }

  verifyToken(): Observable<boolean> {
    const isValid = this.VALID_TOKEN === localStorage.getItem('token');
    if (isValid) {
      this._authUser$.next(this.FAKE_USER);
    }
    return of(isValid);
  }


  obtenerUsuarioAutenticado() { }
}
