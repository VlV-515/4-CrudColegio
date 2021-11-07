import { ProfesorInt } from './../profesor/interfaces/profesor';
import { ProfesorService } from './../profesor/services/profesor.service';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GradoInt } from './interfaces/grado';
import { GradoService } from './services/grado.service';

@Component({
  selector: 'app-grado',
  templateUrl: './grado.component.html',
  styleUrls: ['./grado.component.css'],
})
export class GradoComponent implements OnInit {
  gradosArr!: GradoInt[];
  profesorArr!: ProfesorInt[];
  profesor!: string;
  tittleModal: string = '';
  gradoModal: GradoInt | undefined;
  constructor(
    private gradoService: GradoService,
    public modal: NgbModal,
    public Route: RouterModule,
    private profesorService: ProfesorService
  ) {}

  ngOnInit(): void {
    this.refreshGradosArr();
    this.refreshProfesorArr();
  }

  refreshGradosArr(): void {
    this.gradoService.getGrados().subscribe((resp: GradoInt[]) => {
      this.gradosArr = resp;
    });
  }
  refreshProfesorArr(): void {
    this.profesorService
      .getProfesores()
      .subscribe((array: ProfesorInt[]) => (this.profesorArr = array));
  }
  btnNuevo(modal: any): void {
    //Mandamos el grado como indefinido para que se sepa que es uno nuevo
    this.tittleModal = 'Nuevo grado';
    this.gradoModal = undefined;
    this.modal.open(modal);
  }
  nuevoGrado(data: GradoInt): void {
    this.gradoService.nuevoGrado(data).subscribe((resp) => {
      alert('Grado agregado =)');
      this.refreshGradosArr();
    });
  }
  btnEditar(modal: any, grado: GradoInt) {
    this.tittleModal = 'Editar Grado';
    this.gradoModal = grado;
    this.modal.open(modal);
  }
  editarGrado(data: GradoInt): void {
    this.gradoService.editarGrado(data).subscribe((resp) => {
      alert('Grado modificado =)');
      this.refreshGradosArr();
    });
  }
  getDataForm(data: GradoInt): void {
    //Verificamos si tiene id, osea si es un nuevo
    if (data.idGrado) {
      this.editarGrado(data);
    } else {
      this.nuevoGrado(data);
    }
  }
  getProfesor(id: number): string {
    const profesor: ProfesorInt | undefined = this.profesorArr.find(
      (pro: ProfesorInt) => pro.idProfesor == id
    );
    if (profesor) {
      return profesor.nombreProfesor;
    } else {
      return '## Profesor ##';
    }
  }
  btnEliminar(id: number): void {
    const ask = window.confirm('¿Seguro de eliminar este grado?');
    if (ask) {
      this.gradoService.eliminaGrado(id).subscribe((resp) => {
        alert('Grado eliminado =)');
        this.refreshGradosArr();
      });
    }
  }
}
