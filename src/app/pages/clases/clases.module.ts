import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClasesRoutingModule } from './clases-routing.module';
import { ClasesComponent } from './clases.component';
import { ClasesDialogComponent } from './clases-dialog/clases-dialog.component';
import { MaterialModule } from '../../core/utils/material.module';


@NgModule({
  declarations: [
    ClasesComponent,
    ClasesDialogComponent
  ],
  imports: [
    CommonModule,
    ClasesRoutingModule,
    MaterialModule
  ]
})
export class ClasesModule { }
