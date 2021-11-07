import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfesorRoutingModule } from './profesor-routing.module';
import { ProfesorComponent } from './profesor.component';
import { FormComponent } from './form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProfesorComponent, FormComponent],
  imports: [
    CommonModule,
    ProfesorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [FormComponent],
})
export class ProfesorModule {}
