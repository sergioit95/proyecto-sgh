import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Administrador } from '../../interfaces/administrador.model';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {
  private apiUrl = '/api/administradores';

  constructor(private http: HttpClient) {}

  obtenerTodosLosAdministradores(): Observable<Administrador[]> {
    return this.http.get<Administrador[]>(this.apiUrl);
  }

  obtenerAdministradorPorId(id: number): Observable<Administrador> {
    return this.http.get<Administrador>(`${this.apiUrl}/${id}`);
  }

  crearAdministrador(administrador: Administrador): Observable<string> {
    return this.http.post<string>(this.apiUrl, administrador);
  }

  modificarAdministrador(id: number, administrador: Administrador): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/${id}`, administrador);
  }

  eliminarAdministrador(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${id}`);
  }
}
