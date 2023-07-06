import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Miembro } from '../Models/Miembro';
import { Categoria } from '../Models/Categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private url = 'http://localhost:4001/categorias';

  constructor(private http: HttpClient) { }

  obtenerCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.url}/dto`);
  }

  guardarCategoria(categoriaData: any): Observable<any> {
    const headers = this.getHeaders();

    return this.http.post<any>(`${this.url}`, categoriaData, { headers });
  }

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    // Agrega cualquier otra cabecera necesaria

    return headers;
  }
}