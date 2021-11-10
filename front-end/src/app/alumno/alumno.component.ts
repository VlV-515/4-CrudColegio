import { RouterModule } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { AlumnoInt } from './interfaces/alumno';
import { AlumnoService } from './services/alumno.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.css'],
})
export class AlumnoComponent implements OnInit {
  alumnosArr!: AlumnoInt[];
  tittleModal: string = '';
  alumnoModal: AlumnoInt | undefined;
  constructor(
    private alumnoService: AlumnoService,
    public modal: NgbModal,
    public Route: RouterModule
  ) {}

  ngOnInit(): void {
    this.refreshTable();
  }

  refreshTable(): void {
    this.alumnoService.getAlumnos().subscribe(
      (resp: AlumnoInt[]) => (this.alumnosArr = resp),
      (err: HttpErrorResponse) => {
        alert('Ocurrio un error inesperado');
      }
    );
  }
  btnNuevo(modal: any): void {
    //Mandamos el alumno como indefinido para que se sepa que es uno nuevo
    this.tittleModal = 'Nuevo alumno';
    this.alumnoModal = undefined;
    this.modal.open(modal);
  }
  nuevoAlumno(data: AlumnoInt): void {
    this.alumnoService.nuevoAlumno(data).subscribe(
      (resp) => {
        alert('Alumno agregado =)');
        this.refreshTable();
      },
      (err: HttpErrorResponse) => {
        alert('Ocurrio un error inesperado');
      }
    );
  }
  btnEditar(modal: any, alumno: AlumnoInt) {
    this.tittleModal = 'Editar Alumno';
    this.alumnoModal = alumno;
    this.modal.open(modal);
  }
  editarAlumno(data: AlumnoInt): void {
    this.alumnoService.editarAlumno(data).subscribe(
      (resp) => {
        alert('Alumno modificado =)');
        this.refreshTable();
      },
      (err: HttpErrorResponse) => {
        alert('Ocurrio un error inesperado');
      }
    );
  }
  getDataForm(data: AlumnoInt): void {
    //Verificamos si tiene id, osea si es un nuevo
    if (data.idAlumno) {
      this.editarAlumno(data);
    } else {
      this.nuevoAlumno(data);
    }
  }
  btnEliminar(id: number): void {
    const ask = window.confirm('¿Seguro de eliminar este alumno?');
    if (ask) {
      this.alumnoService.eliminaAlumno(id).subscribe(
        (resp) => {
          alert('Alumno eliminado =)');
          this.refreshTable();
        },
        (err: HttpErrorResponse) => {
          alert('Ocurrio un error inesperado');
        }
      );
    }
  }
}
