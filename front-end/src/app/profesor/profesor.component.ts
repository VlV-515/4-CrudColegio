import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfesorInt } from './interfaces/profesor';
import { ProfesorService } from './services/profesor.service';

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.component.html',
  styleUrls: ['./profesor.component.css'],
})
export class ProfesorComponent implements OnInit {
  profesorsArr!: ProfesorInt[];
  tittleModal: string = '';
  profesorModal: ProfesorInt | undefined;
  constructor(
    private profesorService: ProfesorService,
    public modal: NgbModal,
    public Route: RouterModule
  ) {}

  ngOnInit(): void {
    this.refreshTable();
  }

  refreshTable(): void {
    this.profesorService.getProfesores().subscribe(
      (resp: ProfesorInt[]) => (this.profesorsArr = resp),
      (err: HttpErrorResponse) => alert('Ocurrio un error inesperado')
    );
  }
  btnNuevo(modal: any): void {
    //Mandamos el profesor como indefinido para que se sepa que es uno nuevo
    this.tittleModal = 'Nuevo profesor';
    this.profesorModal = undefined;
    this.modal.open(modal);
  }
  nuevoprofesor(data: ProfesorInt): void {
    this.profesorService.nuevoProfesor(data).subscribe(
      (resp) => {
        alert('profesor agregado =)');
        this.refreshTable();
      },
      (err: HttpErrorResponse) => alert('Ocurrio un error inesperado')
    );
  }
  btnEditar(modal: any, profesor: ProfesorInt) {
    this.tittleModal = 'Editar profesor';
    this.profesorModal = profesor;
    this.modal.open(modal);
  }
  editarprofesor(data: ProfesorInt): void {
    this.profesorService.editarProfesor(data).subscribe(
      (resp) => {
        alert('profesor modificado =)');
        this.refreshTable();
      },
      (err: HttpErrorResponse) => alert('Ocurrio un error inesperado')
    );
  }
  getDataForm(data: ProfesorInt): void {
    //Verificamos si tiene id, osea si es un nuevo
    if (data.idProfesor) {
      this.editarprofesor(data);
    } else {
      this.nuevoprofesor(data);
    }
  }
  btnEliminar(id: number): void {
    const ask = window.confirm('¿Seguro de eliminar este profesor?');
    if (ask) {
      this.profesorService.eliminaProfesor(id).subscribe(
        (resp) => {
          alert('profesor eliminado =)');
          this.refreshTable();
        },
        (err: HttpErrorResponse) => alert('Ocurrio un error inesperado')
      );
    }
  }
}
