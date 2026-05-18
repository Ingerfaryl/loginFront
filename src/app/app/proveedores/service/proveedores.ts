import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Proveedores {
  private apiUrl = `${environment.apiUrl}ProveedorControllers`;
  constructor(private http: HttpClient) { }

  listaProveedores(opcion: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/GetProveedor`, {
      params: { opcion }
    });
  }
}
