import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Redactor } from '../../interfaces/redactor.model';

@Injectable({
  providedIn: 'root'
})
export class RedactorService {
  private apiUrl = '/api/redactores';

  constructor(private http: HttpClient) {}

  obtenerTodosLosRedactores(): Observable<Redactor[]> {
    return this.http.get<Redactor[]>(this.apiUrl);
  }

  obtenerRedactorPorId(id: number): Observable<Redactor> {
    return this.http.get<Redactor>(`${this.apiUrl}/${id}`);
  }

  crearRedactor(redactor: Redactor): Observable<string> {
    return this.http.post<string>(this.apiUrl, redactor);
  }

  modificarRedactor(id: number, redactor: Redactor): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/${id}`, redactor);
  }

  eliminarRedactor(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${id}`);
  }
}
