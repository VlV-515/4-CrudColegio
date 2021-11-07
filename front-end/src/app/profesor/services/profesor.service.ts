import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
    return this.http.get<ProfesorInt[]>(`${environment.urlAPI}?profesores`);
  }
  //*CASO: Un solo profesor
  getProfesor(id: number): Observable<ProfesorInt> {
    return this.http.get<ProfesorInt>(`${environment.urlAPI}?profesor=${id}`);
  }
  //*CASO: Agrega un profesor
  nuevoProfesor(data: ProfesorInt): Observable<RespProfesorInt> {
    return this.http.post<RespProfesorInt>(
      `${environment.urlAPI}?profesorNuevo`,
      data
    );
  }
  //*CASO: Edita un profesor
  editarProfesor(data: ProfesorInt): Observable<RespProfesorInt> {
    return this.http.post<RespProfesorInt>(
      `${environment.urlAPI}?profesorEditar`,
      data
    );
  }
  //*CASO: Elimina un profesor
  eliminaProfesor(id: number): Observable<RespProfesorInt> {
    return this.http.get<RespProfesorInt>(
      `${environment.urlAPI}?profesorBorrar=${id}`
    );
  }
}
