import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LayoutModule } from './layout/layout.module';
import { ReversePipe } from './core/pipes/reverse.pipe';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
// import { NomApeAlumnosPipe } from './core/pipes/nom-ape-alumnos.pipe';
// import { FontTituloDirective } from './core/directives/font-titulo.directive';


@NgModule({
  declarations: [
    AppComponent,
    ReversePipe,
    // NomApeAlumnosPipe,
    // FontTituloDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule
  ],

  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideNativeDateAdapter(),
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'outline',
      },
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
