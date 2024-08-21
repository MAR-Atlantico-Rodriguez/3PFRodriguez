import { Enrollment } from "./enrollment";

export interface Course {
    id: string;
    name: string;
    startDate: Date;
    endDate: Date;
    enrollments?: Enrollment[];
}
