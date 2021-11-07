import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AlumnoInt } from '../interfaces/alumno';

@Component({
  selector: 'app-formAlumno',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  formAlumno!: FormGroup;
  @Input() title: string = 'Titulo';
  @Input() alumno: AlumnoInt | undefined;
  @Output() respForm = new EventEmitter<AlumnoInt>();
  constructor(private fb: FormBuilder, private modal: NgbModal) {}

  ngOnInit(): void {
    //Si es indefinido el alumno, entonces es uno nuevo
    if (!this.alumno) {
      this.formAlumno = this.fb.group({
        nombreAlumno: [''],
        apellidosAlumno: [''],
        generoAlumno: [0],
        fechaNacimientoAlumno: [''],
      });
    } else {
      //Editar alumno
      this.formAlumno = this.fb.group({
        nombreAlumno: [this.alumno.nombreAlumno],
        apellidosAlumno: [this.alumno.apellidosAlumno],
        generoAlumno: [this.alumno.generoAlumno],
        fechaNacimientoAlumno: [this.alumno.fechaNacimientoAlumno],
      });
    }
  }

  cleanAndCloseModal() {
    this.formAlumno.setValue({
      nombreAlumno: [''],
      apellidosAlumno: [''],
      generoAlumno: [''],
      fechaNacimientoAlumno: [''],
    });
    this.modal.dismissAll();
  }
  save(form: AlumnoInt) {
    //Pregunto si esta seguro
    const ask = window.confirm('¿Seguro de guardar los cambios.?');
    if (ask) {
      //Si es indefinido el alumno, entonces es uno nuevo
      if (!this.alumno) {
        //Si es nuevo, emito todo asi tal cual
        this.respForm.emit(form);
      } else {
        //Si es un edit, lo mando con su id y lo emitimos
        const alumno = {
          idAlumno: this.alumno.idAlumno,
          nombreAlumno: form.nombreAlumno,
          apellidosAlumno: form.apellidosAlumno,
          generoAlumno: form.generoAlumno,
          fechaNacimientoAlumno: form.fechaNacimientoAlumno,
        };
        this.respForm.emit(alumno);
      }
      this.cleanAndCloseModal();
    }
  }
}
