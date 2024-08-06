import { Course } from "./course";

export interface Clase {
    id: string;
    cursoId: string;
    cursoName?: String;
    title: string;
    date: Date;
}