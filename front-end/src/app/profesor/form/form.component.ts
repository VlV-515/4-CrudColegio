import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfesorInt } from '../interfaces/profesor';

@Component({
  selector: 'app-formProfesor',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  formProfesor!: FormGroup;
  @Input() title: string = 'Titulo';
  @Input() profesor: ProfesorInt | undefined;
  @Output() respForm = new EventEmitter<ProfesorInt>();
  constructor(private fb: FormBuilder, private modal: NgbModal) {}

  ngOnInit(): void {
    //Si es indefinido el profesor, entonces es uno nuevo
    if (!this.profesor) {
      this.formProfesor = this.fb.group({
        nombreProfesor: [''],
        apellidosProfesor: [''],
        generoProfesor: [0],
      });
    } else {
      //Editar profesor
      this.formProfesor = this.fb.group({
        nombreProfesor: [this.profesor.nombreProfesor],
        apellidosProfesor: [this.profesor.apellidosProfesor],
        generoProfesor: [this.profesor.generoProfesor],
      });
    }
  }

  cleanAndCloseModal() {
    this.formProfesor.setValue({
      nombreProfesor: [''],
      apellidosProfesor: [''],
      generoProfesor: [''],
    });
    this.modal.dismissAll();
  }
  save(form: ProfesorInt) {
    //Pregunto si esta seguro
    const ask = window.confirm('¿Seguro de guardar los cambios.?');
    if (ask) {
      //Si es indefinido el profesor, entonces es uno nuevo
      if (!this.profesor) {
        //Si es nuevo, emito todo asi tal cual
        this.respForm.emit(form);
      } else {
        //Si es un edit, lo mando con su id y lo emitimos
        const profesor = {
          idProfesor: this.profesor.idProfesor,
          nombreProfesor: form.nombreProfesor,
          apellidosProfesor: form.apellidosProfesor,
          generoProfesor: form.generoProfesor,
        };
        this.respForm.emit(profesor);
      }
      this.cleanAndCloseModal();
    }
  }
}
