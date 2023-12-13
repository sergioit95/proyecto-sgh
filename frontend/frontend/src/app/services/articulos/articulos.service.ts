import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Articulo } from '../../interfaces/articulo.model'; // Asegúrate de importar tu modelo de Articulo

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {
  private apiUrl = 'http://localhost:8080/api/articulos';

  constructor(private http: HttpClient) { }

  obtenerTodosLosArticulos(): Observable<Articulo[]> {
    return this.http.get<Articulo[]>(this.apiUrl);
  }

  // otros métodos del servicio
}