import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { Ordencompra } from './services/ordencompra';
import { CommonModule } from '@angular/common';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';
import { SelectModule } from 'primeng/select';
import { Proveedores } from '../proveedores/service/proveedores';

interface ColDef {
  field: string;
  header: string;
}

const CAMPOS_NUMERICOS = new Set(['Sub Total', 'IGV', 'Total', 'Cantidad', 'Kilos', 'Precio']);

@Component({
  selector: 'app-orden-compra',
  standalone: true,
  imports: [
    CardModule, ButtonModule, FormsModule, InputTextModule,
    DatePickerModule, TableModule, PaginatorModule,
    CommonModule, DialogModule, SelectModule
  ],
  templateUrl: './orden-compra.html',
})
export class OrdenCompra implements OnInit {

  filtro = {
    emisor: '',
    proveedor: null as string | null,
    mes: null as Date | null
  };

  lista: any[] = [];
  cols: ColDef[] = [];
  cargando = false;

  displayModal = false;
  detalle: any[] = [];
  cargandoDetalle = false;
  columnasDetalle: string[] = [];

  proveedores: any[] = [];
  haBuscado: boolean = false;

  tiposDocumento = [
    { name: 'Orden de Compra', value: 87 },
    { name: 'Orden de Servicio', value: 89 }
  ];
  selectedTipoDocumento: number | null = null;

  constructor(
    private ordencompraService: Ordencompra,
    private proveedorService: Proveedores,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.cargarProveedores();
  }

  cargarProveedores() {
    this.proveedorService.listaProveedores(1).subscribe({
      next: (resp: any) => {
        Promise.resolve().then(() => {
          this.proveedores = resp.results || [];
          this.cdr.detectChanges();
        });
      }
    });
  }

  buscar() {
    this.haBuscado = true;
    this.lista = [];
    this.cols = [];
    this.cargando = true;

    let fechaInicio: Date | null = null;
    let fechaFin: Date | null = null;

    if (this.filtro.mes) {
      const año = this.filtro.mes.getFullYear();
      const mes = this.filtro.mes.getMonth();
      fechaInicio = new Date(año, mes, 1);
      fechaFin = new Date(año, mes + 1, 0);
    }

    const request = {
      opcion: 1,
      emisor: this.filtro.emisor || '',
      proveedor: this.filtro.proveedor || '',
      correlativo: '',
      tipoDocumento: this.selectedTipoDocumento ?? 0,
      fechaInicio,
      fechaFin
    };

    this.ordencompraService.listarOrdenesCompra(request).subscribe({
      next: (resp) => {
        const resultados = resp.results || [];

        if (resultados.length > 0) {
          this.lista = resultados.map((item: any) => this.redondearNumericos(item));
          this.cols = Object.keys(resultados[0]).map(key => ({
            field: key,
            header: key
          }));
        } else {
          this.lista = [];
          this.cols = [];
        }

        Promise.resolve().then(() => {
          this.cargando = false;
          this.cdr.detectChanges();
        });
      },
      error: (err) => {
        console.error(err);
        Promise.resolve().then(() => {
          this.cargando = false;
          this.cdr.detectChanges();
        });
      }
    });
  }

  verDetalle(row: any) {
    this.detalle = [];
    this.columnasDetalle = [];
    this.displayModal = false;
    this.cargandoDetalle = true;

    const request = {
      opcion: 2,
      correlativo: row.Correlativo,
      emisor: '',
      proveedor: '',
      tipoDocumento: row.CodigoDocumento,
      fechaInicio: null,
      fechaFin: null
    };

    this.ordencompraService.listarOrdenesCompra(request).subscribe({
      next: (resp) => {
        const resultados = resp.results || [];
        this.detalle = resultados.map((item: any) => this.redondearNumericos(item));

        if (this.detalle.length > 0) {
          this.columnasDetalle = Object.keys(this.detalle[0]);
        }

        Promise.resolve().then(() => {
          this.cargandoDetalle = false;
          this.displayModal = true;
          this.cdr.detectChanges();
        });
      }
    });
  }

  redondearNumericos(item: any): any {
    const copia = { ...item };
    for (const key of Object.keys(copia)) {
      if (CAMPOS_NUMERICOS.has(key) && typeof copia[key] === 'number') {
        copia[key] = Math.round(copia[key] * 100) / 100;
      }
    }
    return copia;
  }

  formatearValor(valor: any, campo: string): any {
    if (CAMPOS_NUMERICOS.has(campo) && valor !== null && valor !== undefined && !isNaN(Number(valor))) {
      return Number(valor).toFixed(2);
    }
    return valor ?? '';
  }
}