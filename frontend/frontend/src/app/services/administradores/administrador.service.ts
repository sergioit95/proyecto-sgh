import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Administrador } from '../../interfaces/administrador.model';
import { Redactor } from '../../interfaces/redactor.model';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {
  
  private apiUrlAdmin = 'http://localhost:8080/api/administradores/'; 
  private apiUrlRedactores = 'http://localhost:8080/api/administradores/redactores'; 

  constructor(private http: HttpClient) { }

  obtenerTodosLosAdministradores(): Observable<Administrador[]> {
    return this.http.get<Administrador[]>(`${this.apiUrlAdmin}`);
  }

  obtenerTodosLosRedactores(): Observable<Redactor[]> {
    return this.http.get<Redactor[]>(`${this.apiUrlRedactores}`);
  }

  crearAdministrador(administrador: Administrador): Observable<string> {
    return this.http.post<string>(`${this.apiUrlAdmin}`, administrador, { responseType: 'text' as 'json' });
  }

  modificarAdministrador(administrador: Administrador): Observable<string> {
    return this.http.put<string>(`${this.apiUrlAdmin}/${administrador.id}`, administrador, { responseType: 'text' as 'json' });
  }

  eliminarAdministrador(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrlAdmin}${id}`);
  }

  crearRedactor(redactor: Redactor): Observable<string> {
    return this.http.post<string>(`${this.apiUrlRedactores}`, redactor, { responseType: 'text' as 'json' });
  }

  eliminarRedactor(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrlRedactores}/${id}`, { responseType: 'text' as 'json' });
  }
}