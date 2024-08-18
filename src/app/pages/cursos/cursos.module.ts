import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursosComponent } from './cursos.component';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { CourseDialogComponent } from './course-dialog/course-dialog.component';
import { CursosRoutingModule } from './cursos-routing.module';
import { RouterLink } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { CursosEffects } from './store/cursos.effects';
import { cursosFeature } from './store/cursos.reducer';
import { StoreModule } from '@ngrx/store';



@NgModule({
  declarations: [
    CursosComponent,
    CourseDialogComponent
  ],
  exports: [CursosComponent],
  imports: [
    CommonModule,
    CursosRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatTableModule,
    MatProgressSpinnerModule,
    RouterLink,
    StoreModule.forFeature(cursosFeature),
    EffectsModule.forFeature([CursosEffects])
  ]
})
export class CursosModule { }
