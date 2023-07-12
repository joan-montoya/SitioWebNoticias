import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReaccionService {

  private url = 'http://localhost:4001/reacciones';

  constructor(private http: HttpClient) { }

  obtenerReacciones(): Observable<any> {
    return this.http.get<any>(`${this.url}/dto`);
  }

  guardarReaccion(reaccionData: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(`${this.url}`, reaccionData, { headers });
  }

  eliminarReaccion(idReaccion: any): Observable<any> {
    return this.http.delete<any>(`${this.url}/${idReaccion}`);
  }

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    // Agrega cualquier otra cabecera necesaria

    return headers;
  }
}
