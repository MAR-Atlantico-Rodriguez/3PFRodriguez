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

  login(email: string, password: string): any {
    if (email == this.FAKE_USER.email && password == this.FAKE_USER.password) {
      this._authUser$.next(this.FAKE_USER);
      try {
        localStorage.setItem('token', this.VALID_TOKEN);
        this.router.navigate(['']);
      } catch (error) {
        console.log('error', error);
        return error;
      }
    } else {
      return 'Email o Password invalidos!';
    }
  }

  logout() {
    this._authUser$.next(null);
    localStorage.removeItem('token');
    this.router.navigate(['authLogin']);
  }

  verifyToken(): Observable<boolean> {
    try {
      const isValid = this.VALID_TOKEN === localStorage.getItem('token');
      if (isValid) {
        this._authUser$.next(this.FAKE_USER);
      }
      return of(isValid);
    } catch {
      return of(false);
    }
  }


  obtenerUsuarioAutenticado() { }
}
