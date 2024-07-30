import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent
  },
  {
    path: 'home',
    loadChildren: () => import('../pages/home/home.module').then(m => m.HomeModule),
    title: "CoderHouse"
  },
  {
    path: 'cursos',
    loadChildren: () => import('../pages/cursos/cursos.module').then(m => m.CursosModule),
    title: "CoderHouse | Cursos"
  },
  {
    path: 'alumnos',
    loadChildren: () => import('../pages/alumnos/alumnos.module').then(m => m.AlumnosModule),
    title: "CoderHouse | Alumnos"
  },
  {
    path: 'inscripciones',
    loadChildren: () => import('../pages/inscripciones/inscripciones.module').then(m => m.InscripcionesModule),
    title: "CoderHouse | Inscripciones"
  },
  {
    path: 'clases',
    loadChildren: () => import('../pages/clases/clases.module').then(m => m.ClasesModule),
    title: "CoderHouse | Clases"
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
