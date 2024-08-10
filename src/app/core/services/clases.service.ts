import { Injectable } from '@angular/core';
import { Clase } from '../interfaces/clases';
import { filter, find, map, Observable, tap } from 'rxjs';
import { CoursesService } from './courses.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClasesService {


  constructor(private courseService: CoursesService, private http: HttpClient) { }

  editClasesById(id: string, update: Clase) {
    // this.MY_DATABASE_CLASES = this.MY_DATABASE_CLASES.map((el) =>
    //   el.id === id ? { ...update, id } : el
    // );
    return this.getClases();
  }

  getClases(): Observable<Clase> {
    return this.http.get<Clase>(environment.apiUrl + '/clases');
  }

  getClasesOfCourses(id: string): Observable<Clase[]> {
    return this.http.get<Clase[]>(environment.apiUrl + '/clases').pipe(
      map(clases => clases.filter(clase => clase.cursoId === id))
    );
  }

  addClases(Clases: Clase): Observable<Clase> {
    // this.MY_DATABASE_CLASES.push(Clases);
    return this.getClases();
  }

  deleteClasesById(id: string): Observable<Clase> {
    // this.MY_DATABASE_CLASES = this.MY_DATABASE_CLASES.filter((el) => el.id != id);
    return this.getClases();
  }

  getCourseName(cursoId: string) {
    return this.courseService.oneCoursesById(cursoId);
  }

}
