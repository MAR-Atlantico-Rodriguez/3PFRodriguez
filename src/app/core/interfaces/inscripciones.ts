import { Alumno } from "./alumno";
import { Course } from "./course";

export interface Inscripciones {
    id: string;
    course: Course;
    alumno: Alumno;
    registration_date: Date;
}
