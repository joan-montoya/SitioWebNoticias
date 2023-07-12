import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {
  private url = 'http://localhost:4001/comentarios';

  constructor(private http: HttpClient) { }

  obtenerComentarios(): Observable<any> {
    return this.http.get<any>(`${this.url}/dto`);
  }

  guardarComentario(comentarioData: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(`${this.url}`, comentarioData, { headers });
  }

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    // Agrega cualquier otra cabecera necesaria

    return headers;
  }
}
