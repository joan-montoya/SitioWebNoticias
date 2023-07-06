import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../Models/Usuario';
import { Grupo } from '../Models/Grupo';
import { Miembro } from '../Models/Miembro';

@Injectable({
  providedIn: 'root'
})
export class MiembroService {

  private url = 'http://localhost:4001/miembros';

  constructor(private http: HttpClient) { }

  obtenerMiembros(): Observable<Miembro[]> {
    return this.http.get<Miembro[]>(`${this.url}/dto`);
  }

  guardarMiembro(miembroData: any): Observable<any> {
    const headers = this.getHeaders();

    return this.http.post<any>(`${this.url}`, miembroData, { headers });
  }

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    // Agrega cualquier otra cabecera necesaria

    return headers;
  }
}


