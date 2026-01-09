import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from './login/services/login';

@Injectable({
  providedIn: 'root'
})
export class PermisosGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {

    // Obtener el path que intenta visitar
    const ruta = route.routeConfig?.path; // ejemplo: "usuarios"

    const permisos = this.auth.permisos ?? [];

    // Buscar si tiene permiso para esa ruta
    const permisoRuta = permisos.find(p => p.ruta === ruta);

    if (!permisoRuta || permisoRuta.puedeVer !== true) {
      this.router.navigate(['/dashboard']);
      return false;
    }

    return true;
  }
}
