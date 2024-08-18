import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Course } from '../interfaces/course';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { json } from 'stream/consumers';

@Injectable({ providedIn: 'root' })
export class CoursesService {

  constructor(private http: HttpClient) { }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(environment.apiUrl + '/courses');
  }

  addCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(environment.apiUrl + '/courses', course);
  }

  editCourseById(id: string, course: Course) {
    return this.http.put<Course>(environment.apiUrl + '/courses/' + id, course);
  }

  deleteCourseById(id: string): Observable<Course> {
    // this.MY_DATABASE = this.MY_DATABASE.filter((el) => el.id != id);
    return this.http.delete<Course>(environment.apiUrl + '/courses/' + id);
    // return this.getCourses();
  }

  oneCoursesById(id: string): Observable<Course> {
    // return this.MY_DATABASE.find(a => a.id === id)?.name;
    return this.http.get<Course>(environment.apiUrl + '/courses/' + id);
  }
}