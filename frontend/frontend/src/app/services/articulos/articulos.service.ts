// articulo.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Articulo } from 'src/app/interfaces/articulo.model';
@Injectable({
  providedIn: 'root',
})
export class ArticuloService {
  private apiUrl = 'http://localhost:8080/api/articulos';

  constructor(private http: HttpClient) {}

  obtenerTodosLosArticulos(): Observable<Articulo[]> {
    return this.http.get<Articulo[]>(this.apiUrl);
  }

  obtenerArticuloPorId(id: number): Observable<Articulo> {
    const url = `${this.apiUrl}/articulos/${id}`;
    return this.http.get<Articulo>(url);
  }

  crearArticulo(idRedactor: number, articulo: Articulo): Observable<string> {
    const url = `${this.apiUrl}/${idRedactor}/articulos`;
    return this.http.post<string>(url, articulo);
  }

  modificarArticulo(idRedactor: number, idArticulo: number, articulo: Articulo): Observable<string> {
    const url = `${this.apiUrl}/${idRedactor}/articulos/${idArticulo}`;
    return this.http.put<string>(url, articulo);
  }

  eliminarArticulo(idRedactor: number, idArticulo: number): Observable<string> {
    const url = `${this.apiUrl}/${idRedactor}/articulos/${idArticulo}`;
    return this.http.delete<string>(url);
  }
}
