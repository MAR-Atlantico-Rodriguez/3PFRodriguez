import { Component, WritableSignal } from '@angular/core';
// import { AlumnosService } from '../../core/services/alumnos.service';
import { Alumno } from '../../core/interfaces/alumno';
import { MatDialog } from '@angular/material/dialog';
import { AlumnosDialogComponent } from './alumnos-dialog/alumnos-dialog.component';
import { generateId } from '../../core/utils';
import { Store } from '@ngrx/store';
import { RootState } from '../../core/store';
import { AlumnosActions } from './store/alumnos.actions';
import { Observable, of, Subscription } from 'rxjs';
import { selectAlumnos, selectAlumnosState, selectIsLoading } from './store/alumnos.selectors';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrl: './alumnos.component.scss'
})
export class AlumnosComponent {

  displayedColumns: string[] = ['id', 'name', 'dni', 'sex', 'birthdate', 'actions'];
  isLoading$: Observable<boolean>;
  dataSource$: Observable<Alumno[]>;

  constructor(
    // private alumnosService: AlumnosService,
    private matDialog: MatDialog,
    private store: Store<RootState>
  ) {
    this.dataSource$ = this.store.select(selectAlumnos);
    this.isLoading$ = this.store.select(selectIsLoading);
  }


  ngOnInit(): void {
    this.store.dispatch(AlumnosActions.loadAlumnoss());
  }

  openDialog(): void {
    this.matDialog
      .open(AlumnosDialogComponent)
      .afterClosed()
      .subscribe({
        next: (value) => {
          value['id'] = generateId(5);
          this.store.dispatch(AlumnosActions.addAlumno({ alumno: value }));
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
            console.log(alumno);
            this.store.dispatch(AlumnosActions.editAlumno({ id: editingAlumno.id, alumnoUpdate: alumno }));
          }
        },
      });
  }

  deleteAlumnoById(id: string) {
    this.store.dispatch(AlumnosActions.deleteAlumnoss({ id }));
  }

}
