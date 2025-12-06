import { Usuario } from './usuario.interface';
import { Permiso } from './permiso.interface';

export interface LoginResponse {
  success: boolean;
  message: string;
  usuario?: Usuario;
  permisos?: Permiso[];
}
