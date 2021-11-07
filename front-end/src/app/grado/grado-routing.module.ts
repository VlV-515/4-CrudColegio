import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GradoComponent } from './grado.component';

const routes: Routes = [{ path: '', component: GradoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GradoRoutingModule { }
