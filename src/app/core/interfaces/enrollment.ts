import { Alumno } from "./alumno";
import { Course } from "./course";

export interface Enrollment {
    id: string;
    courseId: string;
    studentId: string;
}
