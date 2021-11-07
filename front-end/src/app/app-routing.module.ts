import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  { path: 'alumno', loadChildren: () => import('./alumno/alumno.module').then(m => m.AlumnoModule) },
  { path: 'profesor', loadChildren: () => import('./profesor/profesor.module').then(m => m.ProfesorModule) },
  { path: 'grado', loadChildren: () => import('./grado/grado.module').then(m => m.GradoModule) },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
