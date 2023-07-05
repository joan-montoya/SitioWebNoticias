import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../Models/Usuario';
import { Grupo } from '../Models/Grupo';


@Injectable({
  providedIn: 'root'
})
export class GruposService {

  private url = 'http://localhost:4001/grupos';

  constructor(private http: HttpClient) { }

  obtenerGrupos(): Observable<Grupo[]> {
    return this.http.get<Grupo[]>(this.url);
  }

  guardarGrupo(grupoData: any): Observable<any> {
    const headers = this.getHeaders();

    return this.http.post<any>(`${this.url}`, grupoData, { headers });
  }

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    // Agrega cualquier otra cabecera necesaria

    return headers;
  }
}

