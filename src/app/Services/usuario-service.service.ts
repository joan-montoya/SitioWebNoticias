import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../Models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceService {

  private url = 'http://localhost:4001/usuarios';

  constructor(private http: HttpClient) { }

  crearUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.url, usuario);
  }

  obtenerUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.url);
  }

  login(usuario: any): Observable<any> {
    return this.http.post<any>(`${this.url}/login`, usuario);
  }

  modificarUsuario(id: any, usuario: Usuario): Observable<Usuario> {
    return this.http.put<any>(`${this.url}/${id}`, usuario); 
  }
  
}
