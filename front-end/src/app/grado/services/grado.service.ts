import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment.prod';
import { GradoInt, RespGradoInt } from '../interfaces/grado';

@Injectable({
  providedIn: 'root',
})
export class GradoService {
  constructor(private http: HttpClient) {}
  //*CASO: Todos los grados
  getGrados(): Observable<GradoInt[]> {
    return this.http.get<GradoInt[]>(`${environment.urlAPI}?grados`);
  }
  //*CASO: Agrega un grado
  nuevoGrado(data: GradoInt): Observable<RespGradoInt> {
    return this.http.post<RespGradoInt>(`${environment.urlAPI}?gradoNuevo`, data);
  }
  //*CASO: Edita un grado
  editarGrado(data: GradoInt): Observable<RespGradoInt> {
    return this.http.post<RespGradoInt>(`${environment.urlAPI}?gradoEditar`, data);
  }
  //*CASO: Elimina un grado
  eliminaGrado(id: number): Observable<RespGradoInt> {
    return this.http.get<RespGradoInt>(`${environment.urlAPI}?gradoBorrar=${id}`);
  }
}
