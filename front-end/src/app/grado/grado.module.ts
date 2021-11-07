import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GradoRoutingModule } from './grado-routing.module';
import { GradoComponent } from './grado.component';
import { FormComponent } from './form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [GradoComponent, FormComponent],
  imports: [CommonModule, GradoRoutingModule, ReactiveFormsModule, FormsModule],
  exports: [FormComponent],
})
export class GradoModule {}
