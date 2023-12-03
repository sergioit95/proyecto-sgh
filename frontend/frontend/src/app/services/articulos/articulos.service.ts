import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Articulo } from 'src/app/interfaces/articulos';

const baseUrl = 'http://localhost/api/articulos';
@Injectable({
  providedIn: 'root'
})
export class ArticulosService {

  constructor(private http: HttpClient) {
   }

   findAll(): Observable<Articulo[]>{
    return this.http.get<Articulo[]>(`${baseUrl}`);
  }
  findById(id: any): Observable<Articulo>{
    return this.http.get(`${baseUrl}{/id}}`);
  }
  create(articulo: Articulo): Observable<Articulo>{
    return this.http.post(baseUrl, articulo);
  }

  update(articulo: Articulo): Observable<Articulo>{
    return this.http.put(baseUrl, articulo);
  }

  deleteById(id: any): Observable<Articulo>{
    return this.http.delete(`${baseUrl}{/id}`);
  }

  deleteAll(): Observable<Articulo>{
    return this.http.delete(`${baseUrl}`);
  }


}
