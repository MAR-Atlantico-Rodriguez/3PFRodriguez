import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscripcionesComponent } from './inscripciones.component';
import { InscripcionesRoutingModule } from './inscripciones-routing.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { EffectsModule } from '@ngrx/effects';
import { InscripcionesEffects } from './store/inscripciones.effects';
import { inscripcionesFeature } from './store/inscripciones.reducer';
import { StoreModule } from '@ngrx/store';
import { CursosEffects } from '../cursos/store/cursos.effects';
import { AlumnosEffects } from '../alumnos/store/alumnos.effects';
import { cursosFeature } from '../cursos/store/cursos.reducer';
import { alumnosFeature } from '../alumnos/store/alumnos.reducer';
import { MatList, MatListItem } from '@angular/material/list';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { EnrollmentDialogComponent } from './enrollment-dialog/enrollment-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatOption, MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MaterialModule } from '../../core/utils/material.module';


@NgModule({
  declarations: [
    InscripcionesComponent,
    EnrollmentDialogComponent
  ],
  imports: [
    CommonModule,
    InscripcionesRoutingModule,

    MatListItem,

    MaterialModule,
    ReactiveFormsModule,
    StoreModule.forFeature(inscripcionesFeature),
    StoreModule.forFeature(cursosFeature),
    StoreModule.forFeature(alumnosFeature),
    EffectsModule.forFeature([InscripcionesEffects, CursosEffects, AlumnosEffects])
  ]
})
export class InscripcionesModule { }
