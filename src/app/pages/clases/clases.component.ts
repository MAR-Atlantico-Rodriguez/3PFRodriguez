import { OnInit, Component } from '@angular/core';
import { Clase } from '../../core/interfaces/clases';
import { ClasesService } from '../../core/services/clases.service';
import { MatDialog } from '@angular/material/dialog';
import { ClasesDialogComponent } from './clases-dialog/clases-dialog.component';
import { generateId } from '../../core/utils';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.component.html',
  styleUrl: './clases.component.scss'
})
export class ClasesComponent implements OnInit {

  displayedColumns: string[] = ['id', 'cursoId', 'title', 'date', 'actions'];
  dataSource: Clase[] = [];
  isLoading = false;

  constructor(private clasesService: ClasesService, private matDialog: MatDialog) {

  }

  ngOnInit(): void {
    this.loadClases();
  }

  loadClases() {
    this.isLoading = true;
    this.clasesService.getClases().subscribe({
      next: (clases) => {
        this.dataSource = clases;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  getCourseName(cursoId: string) {
    return this.clasesService.getCourseName(cursoId);
  }

  openDialog(): void {
    this.matDialog
      .open(ClasesDialogComponent)
      .afterClosed()
      .subscribe({
        next: (value) => {
          console.log('RECIBIMOS ESTE VALOR: ', value);
          value['id'] = generateId(5);
          this.isLoading = true;
          this.clasesService.addClases(value).subscribe({
            next: (clases) => {
              this.dataSource = [...clases];
            },
            complete: () => {
              this.isLoading = false;
            },
          });
        },
      });
  }

  editClases(editingClases: Clase) {
    this.matDialog
      .open(ClasesDialogComponent, { data: editingClases })
      .afterClosed()
      .subscribe({
        next: (clases) => {
          if (!!clases) {
            this.clasesService
              .editClasesById(editingClases.id, clases)
              .subscribe({
                next: (clases) => {
                  this.dataSource = [...clases];
                },
              });
          }
        },
      });
  }

  deleteClasesById(id: string) {
    if (confirm('Esta seguro?')) {
      this.isLoading = true;

      this.clasesService.deleteClasesById(id).subscribe({
        next: (clases) => {
          this.dataSource = [...clases];
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    }
  }
}
