import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlumnosComponent } from '../pages/alumnos/alumnos.component';
import { CursosComponent } from '../pages/cursos/cursos.component';
import { InscripcionesComponent } from '../pages/inscripciones/inscripciones.component';
import { ClasesComponent } from '../pages/clases/clases.component';

const routes: Routes = [
  {
    path: 'cursos',
    component: CursosComponent,
    loadChildren: () => import('../pages/cursos/cursos.module').then(m => m.CursosModule),
    title: "CoderHouse | Cursos"
  },
  {
    path: 'alumnos',
    component: AlumnosComponent,
    loadChildren: () => import('../pages/alumnos/alumnos.module').then(m => m.AlumnosModule),
    title: "CoderHouse | Alumnos"
  },
  {
    path: 'inscripciones',
    component: InscripcionesComponent,
    loadChildren: () => import('../pages/inscripciones/inscripciones.module').then(m => m.InscripcionesModule),
    title: "CoderHouse | Inscripciones"
  },
  {
    path: 'clases',
    component: ClasesComponent,
    loadChildren: () => import('../pages/clases/clases.module').then(m => m.ClasesModule),
    title: "CoderHouse | Clases"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
