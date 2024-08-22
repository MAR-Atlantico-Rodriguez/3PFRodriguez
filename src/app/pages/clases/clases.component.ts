import { OnInit, Component } from '@angular/core';
import { Clase } from '../../core/interfaces/clases';
import { ClasesService } from '../../core/services/clases.service';
import { MatDialog } from '@angular/material/dialog';
import { ClasesDialogComponent } from './clases-dialog/clases-dialog.component';
import { generateId } from '../../core/utils';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../../core/services/courses.service';
import { selectRole } from '../auth-login/store/auth-login.selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-clases',
  templateUrl: './clases.component.html',
  styleUrl: './clases.component.scss'
})
export class ClasesComponent implements OnInit {

  displayedColumns: string[] = ['id', 'cursoId', 'title', 'date', 'actions'];
  dataSource: any = [];
  isLoading = false;
  idCurso: string | null = '';
  courseName: any;
  role$: Observable<String>;

  constructor(private clasesService: ClasesService,
    private coursesService: CoursesService,
    private matDialog: MatDialog,
    private router: ActivatedRoute,
    private store: Store) {

    this.role$ = this.store.select(selectRole);

  }

  ngOnInit(): void {
    if (this.router.snapshot.params['id'] != "") {
      this.idCurso = this.router.snapshot.params['id'];
    }
    this.loadClases();
  }

  loadClases() {
    this.isLoading = true;
    if (!!this.idCurso) {
      this.getCourseName(this.idCurso);

      this.clasesService.getClasesOfCourses(this.idCurso).subscribe({
        next: (data) => {
          this.dataSource = data
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    } else {
      this.clasesService.getClases()
        .subscribe({
          next: (clases) => {
            this.dataSource = clases;

          },
          complete: () => {
            this.isLoading = false;
          }
        });
    }
  }

  getCourseName(cursoId: string) {

    this.coursesService.oneCoursesById(cursoId).subscribe((d) => this.courseName = d.name)

  }

  openDialog(): void {
    this.matDialog
      .open(ClasesDialogComponent)
      .afterClosed()
      .subscribe({
        next: (value) => {
          // console.log('RECIBIMOS ESTE VALOR: ', value);
          value['id'] = generateId(5);
          this.isLoading = true;
          this.clasesService.addClases(value).subscribe({
            next: (clases) => {
              this.loadClases();
              // this.dataSource = [...clases];
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
                  // this.dataSource = [...clases];
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
          // this.dataSource = [...clases];
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    }
  }
}
