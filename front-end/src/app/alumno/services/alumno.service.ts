import { RespAlumnoInt } from './../interfaces/alumno';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AlumnoInt } from '../interfaces/alumno';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AlumnoService {
  constructor(private http: HttpClient) {}
  //*CASO: Todos los alumnos
  getAlumnos(): Observable<AlumnoInt[]> {
    return this.http.get<AlumnoInt[]>(`${environment.urlAPI}?alumnos`);
  }
  //*CASO: Agrega un alumno
  nuevoAlumno(data: AlumnoInt): Observable<RespAlumnoInt> {
    return this.http.post<RespAlumnoInt>(`${environment.urlAPI}?alumnoNuevo`, data);
  }
  //*CASO: Edita un alumno
  editarAlumno(data: AlumnoInt): Observable<RespAlumnoInt> {
    return this.http.post<RespAlumnoInt>(`${environment.urlAPI}?alumnoEditar`, data);
  }
  //*CASO: Elimina un alumno
  eliminaAlumno(id: number): Observable<RespAlumnoInt> {
    return this.http.get<RespAlumnoInt>(`${environment.urlAPI}?alumnoBorrar=${id}`);
  }
}
