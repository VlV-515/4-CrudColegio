import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { GradoInt, RespGradoInt } from '../interfaces/grado';

@Injectable({
  providedIn: 'root',
})
export class GradoService {
  constructor(private http: HttpClient) {}
  //*CASO: Todos los grados
  getGrados(): Observable<GradoInt[]> {
    return this.http.get<GradoInt[]>(`${environment.urlAPI}?grados`).pipe(
      //Si es un error, entonces no deberia tener ninguna posicion
      tap((resp) => {
        if (!resp[0]) this.handlerErr(resp);
      })
    );
  }
  //*CASO: Agrega un grado
  nuevoGrado(data: GradoInt): Observable<RespGradoInt> {
    return this.http
      .post<RespGradoInt>(`${environment.urlAPI}?gradoNuevo`, data)
      .pipe(
        tap((resp: RespGradoInt) => {
          if (resp.msg == 'error') this.handlerErr(resp);
        })
      );
  }
  //*CASO: Edita un grado
  editarGrado(data: GradoInt): Observable<RespGradoInt> {
    return this.http
      .post<RespGradoInt>(`${environment.urlAPI}?gradoEditar`, data)
      .pipe(
        tap((resp: RespGradoInt) => {
          if (resp.msg == 'error') this.handlerErr(resp);
        })
      );
  }
  //*CASO: Elimina un grado
  eliminaGrado(id: number): Observable<RespGradoInt> {
    return this.http
      .get<RespGradoInt>(`${environment.urlAPI}?gradoBorrar=${id}`)
      .pipe(
        tap((resp: RespGradoInt) => {
          if (resp.msg == 'error') this.handlerErr(resp);
        })
      );
  }
  //*CASO: Manejador de errores
  handlerErr(objError: any): void {
    let errorMsg = 'Ocurrio un error inesperado.';
    if (objError.reason) errorMsg = `Error description: ${objError.reason}`;
    alert(errorMsg);
  }
}
