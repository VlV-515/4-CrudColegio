import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ProfesorInt, RespProfesorInt } from '../interfaces/profesor';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ProfesorService {
  constructor(private http: HttpClient) {}
  //*CASO: Todos los profesor
  getProfesores(): Observable<ProfesorInt[]> {
    return this.http
      .get<ProfesorInt[]>(`${environment.urlAPI}?profesores`)
      .pipe(
        //Si es un error, entonces no deberia tener ninguna posicion
        tap((resp) => {
          if (!resp[0]) this.handlerErr(resp);
        })
      );
  }
  //*CASO: Un solo profesor
  getProfesor(id: number): Observable<ProfesorInt> {
    return this.http
      .get<ProfesorInt>(`${environment.urlAPI}?profesor=${id}`)
      .pipe(
        //Si es un error, entonces no deberia tener ID
        tap((resp) => {
          if (!resp.idProfesor) this.handlerErr(resp);
        })
      );
  }
  //*CASO: Agrega un profesor
  nuevoProfesor(data: ProfesorInt): Observable<RespProfesorInt> {
    return this.http
      .post<RespProfesorInt>(`${environment.urlAPI}?profesorNuevo`, data)
      .pipe(
        tap((resp: RespProfesorInt) => {
          if (resp.msg == 'error') this.handlerErr(resp);
        })
      );
  }
  //*CASO: Edita un profesor
  editarProfesor(data: ProfesorInt): Observable<RespProfesorInt> {
    return this.http
      .post<RespProfesorInt>(`${environment.urlAPI}?profesorEditar`, data)
      .pipe(
        tap((resp: RespProfesorInt) => {
          if (resp.msg == 'error') this.handlerErr(resp);
        })
      );
  }
  //*CASO: Elimina un profesor
  eliminaProfesor(id: number): Observable<RespProfesorInt> {
    return this.http
      .get<RespProfesorInt>(`${environment.urlAPI}?profesorBorrar=${id}`)
      .pipe(
        tap((resp: RespProfesorInt) => {
          if (resp.msg == 'error') this.handlerErr(resp);
        })
      );
  }
  handlerErr(objError: any): void {
    let errorMsg = 'Ocurrio un error inesperado.';
    if (objError.reason) errorMsg = `Error description: ${objError.reason}`;
    alert(errorMsg);
  }
}
