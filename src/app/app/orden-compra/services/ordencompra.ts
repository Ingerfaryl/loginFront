import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { ordencompraParams } from '../Interfaces/orderncompra-interfaces';
@Injectable({
  providedIn: 'root',
})
export class Ordencompra {
  private apiUrl = `${environment.apiUrl}OrdenCompraControllers`;

  constructor(private http: HttpClient) { }

  listarOrdenesCompra(param: ordencompraParams): Observable<any> {
    const params: any = {
      Opcion: param.opcion,
      Emisor: param.emisor,
      Proveedor: param.proveedor,
      Correlativo: param.correlativo,
      tipoDocumento: param.tipoDocumento
    };
    if (param.fechaInicio) {
      params.fechaInicio = param.fechaInicio.toISOString().split('T')[0];
    }

    if (param.fechaFin) {
      params.fechaFin = param.fechaFin.toISOString().split('T')[0];
    }

    return this.http.get<any>(`${this.apiUrl}/GetOrdenCompra`, { params });
  }
}
