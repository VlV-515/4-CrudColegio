import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlumnoRoutingModule } from './alumno-routing.module';
import { AlumnoComponent } from './alumno.component';
import { FormComponent } from './form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AlumnoComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    AlumnoRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports:[FormComponent]
})
export class AlumnoModule { }
