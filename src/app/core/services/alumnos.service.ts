import { Injectable } from '@angular/core';
import { Alumno } from '../interfaces/alumno';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  private MY_DATABASE_ALUMNOS: Alumno[] = [];

  constructor(private http: HttpClient) { }

  getAlumnos(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(environment.apiUrl + '/students');
  }

  addAlumnos(alumno: Alumno): Observable<Alumno> {
    return this.http.post<Alumno>(environment.apiUrl + '/students', alumno);
  }

  editAlumno(id: string, alumno: Alumno) {
    return this.http.patch<Alumno>(environment.apiUrl + '/students/' + id, alumno);
  }

  deleteAlumnosById(id: string): Observable<Alumno> {
    return this.http.delete<Alumno>(environment.apiUrl + '/students/' + id);
  }
}
