import { Injectable } from '@angular/core';
import { Alumno } from '../interfaces/alumno';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  private MY_DATABASE_ALUMNOS: Alumno[] = [
    {
      id: 'Alu-1',
      name: 'Martin',
      surname: 'Rodriguez',
      dni: '33221131',
      sex: 'Masculino',
      birthdate: new Date(),
    },
    {
      id: 'Alu-2',
      name: 'Juan',
      surname: 'Gomez',
      dni: '34658901',
      sex: 'Masculino',
      birthdate: new Date(),
    },
    {
      id: 'Alu-3',
      name: 'Maria',
      surname: 'Gonzalez',
      dni: '36523123',
      sex: 'Femenino',
      birthdate: new Date(),
    },

  ];

  editAlumnoById(id: string, update: Alumno) {
    this.MY_DATABASE_ALUMNOS = this.MY_DATABASE_ALUMNOS.map((el) =>
      el.id === id ? { ...update, id } : el
    );
    return this.getAlumnos();
  }

  getAlumnos(): Observable<Alumno[]> {
    return new Observable((observer) => {
      setTimeout(() => {
        observer.next(this.MY_DATABASE_ALUMNOS);
        observer.complete();
      }, 500);
    });
  }

  addAlumnos(alumno: Alumno): Observable<Alumno[]> {
    this.MY_DATABASE_ALUMNOS.push(alumno);
    return this.getAlumnos();
  }

  deleteAlumnosById(id: string): Observable<Alumno[]> {
    this.MY_DATABASE_ALUMNOS = this.MY_DATABASE_ALUMNOS.filter((el) => el.id != id);
    return this.getAlumnos();
  }
}
