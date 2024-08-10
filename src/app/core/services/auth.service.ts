import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private VALID_TOKEN = "TOKEN-Login123123asdasd"
  // private FAKE_USER: User = {
  //   id: 1,
  //   name: "Martin Rodriguez",
  //   email: "martin@martin.com",
  //   password: "123456",
  //   role: "EMPLOYEE",
  // }

  private _authUser$ = new BehaviorSubject<User | null>(null);
  authUser$ = this._authUser$.asObservable();
  private isAvailable: boolean;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.isAvailable = typeof window !== 'undefined' && !!window.localStorage;
  }

  login(email: string, password: string): any {
    if (email == '' && password == '') {
      return 'Email o Password Vacios!';
    } else {

      this.http.get<User[]>(environment.apiUrl + '/users', {
        params: {
          email: email,
          password: password
        }
      }).subscribe({
        next: (response) => {
          // console.log(response)
          if (response.length > 0) {
            if (response[0].email === email && response[0].password === password) {
              localStorage.setItem('token', response[0].token);
              localStorage.setItem('role', response[0].role);
              this.router.navigate(['']);
            } else {
              alert('Credenciales Invalidas')
            }
          } else {
            alert('Credenciales Invalidas')
          }
        },
        error: (error) => {
          return error;
        }
      });
    }
  }

  logout() {
    this._authUser$.next(null);
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['authLogin']);
  }

  verifyToken(): Observable<boolean> {
    const token = localStorage.getItem('token');
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
            localStorage.setItem('token', authUser.token);
            return true;
          }
        })
      );
  }


  obtenerUsuarioAutenticado() { }
}
