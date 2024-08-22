import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, throwError } from 'rxjs';
import { User, UserLogin, UserRole } from '../interfaces/user';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  _authUser$ = new BehaviorSubject<User | null>(null);
  authUser$ = this._authUser$.asObservable();
  private isAvailable: boolean;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.isAvailable = typeof window !== 'undefined' && !!window.localStorage;
  }

  login(email: string, password: string): Observable<UserLogin> {

    return this.http.get<User[]>(`${environment.apiUrl}/users`, {
      params: {
        email,
        password
      }
    }).pipe(
      map((user) => {
        let usuario = user[0];
        if (usuario.email == email && usuario.password == password) {
          const userName = `${usuario.firstName} ${usuario.lastName}`;
          const token = usuario.token;
          const role = usuario.role as UserRole; // Asegúrate de que role es del tipo UserRole

          window.localStorage.setItem('token', token);
          window.localStorage.setItem('role', role);
          window.localStorage.setItem('userName', userName);

          // Devuelve el objeto UserLogin aquí
          return { token, role, username: userName };
        } else {
          // Lanzar un error para que el observable pueda manejarlo
          throw new Error('Invalid credentials');
        }
      }),
      catchError((error) => {
        // Manejar el error de manera adecuada
        return throwError(() => new Error(error.message));
      })
    );

  }

  logout() {
    this._authUser$.next(null);
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userName');
    this.router.navigate(['authLogin']);
  }

  verifyToken(): Observable<boolean> {
    const token = window.localStorage.getItem('token');
    if (!token) {
      return of(false);
    }

    return this.http.get<User[]>(environment.apiUrl + '/users', {
      params: {
        token,
      },
    })
      .pipe(
        map((res) => {
          if (!res.length) {
            return false;
          } else {
            const authUser = res[0];
            window.localStorage.setItem('token', authUser.token);
            return true;
          }
        })
      );
  }


  obtenerUsuarioAutenticado() { }
}
