import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MensajesService {
  private url = 'http://localhost:4001/mensajes';

  constructor(private http: HttpClient) { }

  obtenerMensajes(): Observable<any> {
    return this.http.get<any>(`${this.url}`);
  }

  guardarMensaje(mensajeData: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(`${this.url}`, mensajeData, { headers });
  }

  eliminarMensaje(idMensaje: any): Observable<any> {
    return this.http.delete<any>(`${this.url}/${idMensaje}`);
  }

  modificarMensaje(id: any, mensaje: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put<any>(`${this.url}/${id}`, mensaje, { headers }); 
  }

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    // Agrega cualquier otra cabecera necesaria

    return headers;
  }
}