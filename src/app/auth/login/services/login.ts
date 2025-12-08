import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { LoginRequest } from '../interfaces/login-request.interface';
import { LoginResponse } from '../interfaces/login-response.interface';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = `${environment.apiUrl}LoginControllers`;

  constructor(private http: HttpClient) { }

  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, data);
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuario: any = null;
  permisos: any[] = [];

  constructor() {
    this.cargarDatos();
  }

  // Para guardar después del login
  guardarDatos(usuario: any, permisos: any[]) {
    this.usuario = usuario;
    this.permisos = permisos;

    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('permisos', JSON.stringify(permisos));
  }

  // Para cargar cuando se inicia Angular
  cargarDatos() {
    const usuarioLS = localStorage.getItem('usuario');
    const permisosLS = localStorage.getItem('permisos');

    if (usuarioLS) this.usuario = JSON.parse(usuarioLS);
    if (permisosLS) this.permisos = JSON.parse(permisosLS);
  }

  clean() {
    localStorage.removeItem('usuario');
    localStorage.removeItem('permisos');
    this.usuario = null;
    this.permisos = [];
  }
  isLoggedIn(): boolean {
    return this.usuario !== null && this.usuario !== undefined;
  }
}
