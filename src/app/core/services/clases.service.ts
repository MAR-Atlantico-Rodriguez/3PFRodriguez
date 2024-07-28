import { Injectable } from '@angular/core';
import { Clase } from '../interfaces/clases';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClasesService {

  private MY_DATABASE_CLASES = [
    {
      id: 'jDcd2',
      title: 'Clase 1',
      date: new Date(),
      cursoId: '1',
    },
    {
      id: 'jDcd3',
      title: 'Javascript',
      date: new Date(),
      cursoId: '2',
    },
    {
      id: 'jDcd5',
      title: 'Photoshop',
      date: new Date(),
      cursoId: '3',
    },
  ];

  constructor() { }

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

}
