import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Articulo } from '../../interfaces/articulo.model';
import { Redactor } from 'src/app/interfaces/redactor.model';

@Injectable({
  providedIn: 'root'
})
export class RedactorService {

  private apiUrl = 'http://localhost:8080/api/redactores';

  constructor(private http: HttpClient) { }
  

  crearArticulo(redactorId: number, articulo: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${redactorId}/articulos`, articulo);
  }

  modificarArticulo(redactorId: number, articuloId: number, articulo: FormData): Observable<Articulo> {
    return this.http.put<Articulo>(`${this.apiUrl}/${redactorId}/articulos/${articuloId}`, articulo);
  }

  eliminarArticulo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/articulos/${id}`);
  }

  obtenerTodosLosArticulos(): Observable<Articulo[]> {
    return this.http.get<Articulo[]>(`${this.apiUrl}/articulos`);
  }
  obtenerRedactores(): Observable<Redactor[]> {
    return this.http.get<Redactor[]>(`${this.apiUrl}`);
  }
}