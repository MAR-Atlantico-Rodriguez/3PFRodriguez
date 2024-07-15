import { Component } from '@angular/core';
import { AlumnosService } from '../../core/services/alumnos.service';
import { Alumno } from '../../core/interfaces/alumno';
import { MatDialog } from '@angular/material/dialog';
import { AlumnosDialogComponent } from './alumnos-dialog/alumnos-dialog.component';
import { generateId } from '../../core/utils';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrl: './alumnos.component.scss'
})
export class AlumnosComponent {

  constructor(
    private alumnosService: AlumnosService,
    private matDialog: MatDialog
  ) { }

  displayedColumns: string[] = ['id', 'name', 'dni', 'sex', 'birthdate', 'actions'];
  dataSource: Alumno[] = [];
  isLoading = false;

  ngOnInit(): void {
    this.loadAlumnos();
  }

  loadAlumnos() {
    this.isLoading = true;
    this.alumnosService.getAlumnos().subscribe({
      next: (alumnos) => {
        this.dataSource = alumnos;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  openDialog(): void {
    this.matDialog
      .open(AlumnosDialogComponent)
      .afterClosed()
      .subscribe({
        next: (value) => {
          console.log('RECIBIMOS ESTE VALOR: ', value);

          // this.nombreCurso = value.name;

          value['id'] = generateId(5);
          this.isLoading = true;
          this.alumnosService.addAlumnos(value).subscribe({
            next: (alumno) => {
              this.dataSource = [...alumno];
            },
            complete: () => {
              this.isLoading = false;
            },
          });
        },
      });
  }

  editAlumno(editingAlumno: Alumno) {
    this.matDialog
      .open(AlumnosDialogComponent, { data: editingAlumno })
      .afterClosed()
      .subscribe({
        next: (alumno) => {
          if (!!alumno) {
            this.alumnosService
              .editAlumnoById(editingAlumno.id, alumno)
              .subscribe({
                next: (alumno) => {
                  this.dataSource = [...alumno];
                },
              });
          }
        },
      });
  }

  deleteAlumnoById(id: string) {
    if (confirm('Esta seguro?')) {
      this.isLoading = true;

      this.alumnosService.deleteAlumnosById(id).subscribe({
        next: (alumno) => {
          this.dataSource = [...alumno];
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    }
  }

}
