import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AuthLoginComponent } from './pages/auth-login/auth-login.component';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'authLogin',
    loadChildren: () => import('./pages/auth-login/auth-login.module').then(m => m.AuthLoginModule)
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule)
  },
  {
    path: '**', // Cualquier ruta que no coincida con las anteriores (basicmanete es un default)
    redirectTo: 'authLogin',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
