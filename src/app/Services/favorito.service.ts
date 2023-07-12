import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritoService {
  private url = 'http://localhost:4001/favoritos';

  constructor(private http: HttpClient) { }

  obtenerFavoritos(): Observable<any> {
    return this.http.get<any>(`${this.url}/dto`);
  }

  guardarFavorito(favoritData: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(`${this.url}`, favoritData, { headers });
  }

  eliminarFavorito(idFavorito: any): Observable<any> {
    return this.http.delete<any>(`${this.url}/${idFavorito}`);
  }

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    // Agrega cualquier otra cabecera necesaria

    return headers;
  }
}