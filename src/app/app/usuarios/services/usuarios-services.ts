import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {environment} from '../../../../environments/environment';
import { usuariosParams } from '../interfaces/usuarios-interfaces';

@Injectable({
  providedIn: 'root',
})
export class UsuariosServices {
  private apiUrl = `${environment.apiUrl}LoginControllers`;
  constructor(private http: HttpClient) {}

  agregarUsuario(parametros: usuariosParams): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/registro`, parametros);
  }
}
