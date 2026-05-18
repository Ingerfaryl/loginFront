export interface ordencompraParams {
  opcion: number;
  emisor: string;
  proveedor: string;
  correlativo: string;
  tipoDocumento: number | null;
  fechaInicio: Date | null;
  fechaFin: Date | null;
}