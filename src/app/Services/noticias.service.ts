import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Noticia } from '../Models/Noticia';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  private url = 'http://localhost:4001/noticias';

  constructor(private http: HttpClient) { }

  obtenerNoticias(): Observable<Noticia[]> {
    return this.http.get<Noticia[]>(`${this.url}/dto`);
  }

  guardarNoticia(noticiaData: any): Observable<any> {
    const headers = this.getHeaders();

    return this.http.post<any>(`${this.url}`, noticiaData, { headers });
  }

  modificarNoticia(id: any, noticia: any): Observable<any> {
    return this.http.put<any>(`${this.url}/${id}`, noticia); 
  }

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    // Agrega cualquier otra cabecera necesaria

    return headers;
  }
}
