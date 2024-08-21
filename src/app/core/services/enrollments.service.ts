import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { Course } from '../interfaces/course';
import { Enrollment } from '../interfaces/enrollment';

@Injectable({ providedIn: 'root' })
export class EnrollmentsService {

  constructor(private http: HttpClient) { }

  getCourseEnrollments(id: string): Observable<Course[]> {
    return this.http.get<Course[]>(environment.apiUrl + '/courses/' + id + '?_embed=enrollments');
  }

  addEnrollment(payload: Enrollment): Observable<Enrollment> {
    return this.http.post<Enrollment>(environment.apiUrl + '/enrollments', payload);
  }

  // editCourseById(id: string, course: Course) {
  //   return this.http.put<Course>(environment.apiUrl + '/courses/' + id, course);
  // }

  // deleteCourseById(id: string): Observable<Course> {
  //   // this.MY_DATABASE = this.MY_DATABASE.filter((el) => el.id != id);
  //   return this.http.delete<Course>(environment.apiUrl + '/courses/' + id);
  //   // return this.getCourses();
  // }

  // oneCoursesById(id: string): Observable<Course> {
  //   // return this.MY_DATABASE.find(a => a.id === id)?.name;
  //   return this.http.get<Course>(environment.apiUrl + '/courses/' + id);
  // }
}