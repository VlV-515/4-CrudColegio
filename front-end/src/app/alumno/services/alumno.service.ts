import { RespAlumnoInt } from './../interfaces/alumno';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AlumnoInt } from '../interfaces/alumno';
import { environment } from 'src/environments/environment.prod';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AlumnoService {
  constructor(private http: HttpClient) {}
  //*CASO: Todos los alumnos
  getAlumnos(): Observable<AlumnoInt[]> {
    return this.http.get<AlumnoInt[]>(`${environment.urlAPI}?alumnos`).pipe(
      //Si es un error, entonces no deberia tener ninguna posicion
      tap((resp) => {
        if (!resp[0]) {
          this.handlerErr(resp);
        }
      })
    );
  }
  //*CASO: Agrega un alumno
  nuevoAlumno(data: AlumnoInt): Observable<RespAlumnoInt> {
    return this.http
      .post<RespAlumnoInt>(`${environment.urlAPI}?alumnoNuevo`, data)
      .pipe(
        tap((resp: RespAlumnoInt) => {
          if (resp.msg == 'error') {
            this.handlerErr(resp);
          }
        })
      );
  }
  //*CASO: Edita un alumno
  editarAlumno(data: AlumnoInt): Observable<RespAlumnoInt> {
    return this.http
      .post<RespAlumnoInt>(`${environment.urlAPI}?alumnoEditar`, data)
      .pipe(
        tap((resp: RespAlumnoInt) => {
          if (resp.msg == 'error') {
            this.handlerErr(resp);
          }
        })
      );
  }
  //*CASO: Elimina un alumno
  eliminaAlumno(id: number): Observable<RespAlumnoInt> {
    return this.http
      .get<RespAlumnoInt>(`${environment.urlAPI}?alumnoBorrar=${id}`)
      .pipe(
        tap((resp: RespAlumnoInt) => {
          if (resp.msg == 'error') {
            this.handlerErr(resp);
          }
        })
      );
  }

  handlerErr(objError: any): void {
    let errorMsg = 'Ocurrio un error inesperado.';
    if (objError.reason) {
      errorMsg = `Error description: ${objError.reason}`;
    }
    alert(errorMsg);
  }
}
