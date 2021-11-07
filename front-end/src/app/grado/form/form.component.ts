import { ProfesorService } from './../../profesor/services/profesor.service';
import { ProfesorInt } from './../../profesor/interfaces/profesor';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GradoInt } from '../interfaces/grado';

@Component({
  selector: 'app-formGrado',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  listProfesores!: ProfesorInt[];
  formGrado!: FormGroup;
  @Input() title: string = 'Titulo';
  @Input() grado: GradoInt | undefined;
  @Output() respForm = new EventEmitter<GradoInt>();
  constructor(
    private fb: FormBuilder,
    private modal: NgbModal,
    private profesorService: ProfesorService
  ) {}

  ngOnInit(): void {
    //Obtenemos la lista de los profesores disponibles
    this.profesorService.getProfesores().subscribe((resp) => {
      this.listProfesores = resp;
    });

    //Si es indefinido el grado, entonces es uno nuevo
    if (!this.grado) {
      this.formGrado = this.fb.group({
        nombreGrado: [''],
        idProfesor: [0],
      });
    } else {
      //Editar grado
      this.formGrado = this.fb.group({
        nombreGrado: [this.grado.nombreGrado],
        idProfesor: [this.grado.idProfesor],
      });
    }
  }

  cleanAndCloseModal() {
    this.formGrado.setValue({
      nombreGrado: [''],
      idProfesor: [''],
    });
    this.modal.dismissAll();
  }
  save(form: GradoInt) {
    //Pregunto si esta seguro
    const ask = window.confirm('¿Seguro de guardar los cambios.?');
    if (ask) {
      //Si es indefinido el grado, entonces es uno nuevo
      if (!this.grado) {
        //Si es nuevo, emito todo asi tal cual
        this.respForm.emit(form);
      } else {
        //Si es un edit, lo mando con su id y lo emitimos
        const grado = {
          idGrado: this.grado.idGrado,
          nombreGrado: form.nombreGrado,
          idProfesor: form.idProfesor,
        };
        this.respForm.emit(grado);
      }
      this.cleanAndCloseModal();
    }
  }
}
