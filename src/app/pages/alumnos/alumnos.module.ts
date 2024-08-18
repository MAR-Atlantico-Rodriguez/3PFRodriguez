import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlumnosComponent } from './alumnos.component';

import { AlumnosDialogComponent } from './alumnos-dialog/alumnos-dialog.component';
import { FontTituloDirective } from '../../core/directives/font-titulo.directive';
import { NomApeAlumnosPipe } from '../../core/pipes/nom-ape-alumnos.pipe';
import { MaterialModule } from '../../core/utils/material.module';
import { AlumnosRoutingModule } from './alumnos-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { AlumnosEffects } from './store/alumnos.effects';
import { StoreModule } from '@ngrx/store';
import { alumnosFeature } from './store/alumnos.reducer';


@NgModule({
  declarations: [
    AlumnosComponent,
    AlumnosDialogComponent,
    FontTituloDirective,
    NomApeAlumnosPipe
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AlumnosRoutingModule,
    StoreModule.forFeature(alumnosFeature),
    EffectsModule.forFeature([AlumnosEffects])
  ]
})
export class AlumnosModule { }
