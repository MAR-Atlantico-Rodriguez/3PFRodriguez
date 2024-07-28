import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClasesRoutingModule } from './clases-routing.module';
import { MaterialModule } from '../../core/utils/material.module';
import { ClasesDialogComponent } from './clases-dialog/clases-dialog.component';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [
    ClasesDialogComponent
  ],
  imports: [
    CommonModule,
    ClasesRoutingModule,
    MaterialModule,
    MatTableModule
  ]
})
export class ClasesModule { }
