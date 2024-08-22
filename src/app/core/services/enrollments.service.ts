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

  deleteEnrollment(id: string): Observable<Enrollment> {
    return this.http.delete<Enrollment>(environment.apiUrl + '/enrollments/' + id);
  }

  // oneCoursesById(id: string): Observable<Course> {
  //   // return this.MY_DATABASE.find(a => a.id === id)?.name;
  //   return this.http.get<Course>(environment.apiUrl + '/courses/' + id);
  // }
}