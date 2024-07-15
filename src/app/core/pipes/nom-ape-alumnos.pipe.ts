import { Pipe, PipeTransform } from '@angular/core';
import { Alumno } from '../interfaces/alumno';

@Pipe({
  name: 'nomApeAlumnos'
})
export class NomApeAlumnosPipe implements PipeTransform {

  transform(value: Alumno, ...args: unknown[]): string {
    return value?.surname + ', ' + value?.name;
  }

}
