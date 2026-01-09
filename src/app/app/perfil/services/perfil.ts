import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {environment} from '../../../../environments/environment';
import { perfilParams } from '../interfaces/perfil-interfaces';
@Injectable({
  providedIn: 'root',
})
export class PerfilService {
  private apiUrl = `${environment.apiUrl}Perfil`;
  constructor(private http: HttpClient) {}

  getPerfil(parametros: perfilParams): Observable<any> {
    return this.http.post<any>(this.apiUrl, parametros);
  }
}
