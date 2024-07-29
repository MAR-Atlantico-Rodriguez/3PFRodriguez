import { Injectable } from '@angular/core';
import { Clase } from '../interfaces/clases';
import { Observable } from 'rxjs';
import { CoursesService } from './courses.service';

@Injectable({
  providedIn: 'root'
})
export class ClasesService {

  private MY_DATABASE_CLASES = [
    {
      id: 'jDcl1',
      title: 'Clase 1',
      date: new Date(),
      cursoId: 'jDcd2',
    },
    {
      id: 'jDcl2',
      title: 'Javascript',
      date: new Date(),
      cursoId: 'jDcd2',
    },
    {
      id: 'jDcl5',
      title: 'Photoshop',
      date: new Date(),
      cursoId: 'jDcd5',
    },
  ];

  constructor(private courseService: CoursesService) { }

  editClasesById(id: string, update: Clase) {
    this.MY_DATABASE_CLASES = this.MY_DATABASE_CLASES.map((el) =>
      el.id === id ? { ...update, id } : el
    );
    return this.getClases();
  }

  getClases(): Observable<Clase[]> {
    return new Observable((observer) => {
      setTimeout(() => {
        observer.next(this.MY_DATABASE_CLASES);
        observer.complete();
      }, 500);
    });
  }

  addClases(Clases: Clase): Observable<Clase[]> {
    this.MY_DATABASE_CLASES.push(Clases);
    return this.getClases();
  }

  deleteClasesById(id: string): Observable<Clase[]> {
    this.MY_DATABASE_CLASES = this.MY_DATABASE_CLASES.filter((el) => el.id != id);
    return this.getClases();
  }

  getCourseName(cursoId: string) {
    return this.courseService.oneCoursesById(cursoId);
  }

}
