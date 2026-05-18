import { Routes } from '@angular/router';
import { Dashboard } from './app/dashboard/dashboard';
import { AuthGuard } from './auth/auth-guard';
import { PermisosGuard } from './auth/permisos-guard';
import { NoAuthGuard } from './auth/no-auth-guard';

export const routes: Routes = [
  {
    path: 'auth',
    canActivate: [NoAuthGuard],
    // Asumiendo que AUTH_ROUTES es un array de rutas standalone
    loadChildren: () => import('./auth/auth-routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: 'dashboard',
    component: Dashboard, // El Layout principal que contiene el Sidebar y Navbar
    canActivate: [AuthGuard],
    children: [
      {
        path: 'usuarios',
        canActivate: [PermisosGuard],
        loadComponent: () => import('./app/usuarios/usuarios').then(m => m.Usuarios),
      },
      {
        path: 'reportes',
        canActivate: [PermisosGuard],
        loadComponent: () => import('./app/reportes/reportes').then(m => m.Reportes),
      },
      {
        path: 'accesos',
        canActivate: [PermisosGuard],
        loadComponent: () => import('./app/accesos/accesos').then(m => m.Accesos),
      },
      {
        path: 'ordenCompra',
        canActivate: [PermisosGuard],
        loadComponent: () => import('./app/orden-compra/orden-compra').then(m => m.OrdenCompra),
      },
      // Opcional: Una ruta por defecto dentro del dashboard para que no quede en blanco
      {
        path: '',
        redirectTo: 'reportes', // o a una vista de inicio
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'admin',
    // Si AdminModule sigue siendo un NgModule antiguo, esto está bien. 
    // Si lo migraste a standalone, cámbialo a loadComponent o carga un array de rutas.
    loadChildren: () => import('./admin/admin-module').then((m) => m.AdminModule),
    canActivate: [PermisosGuard]
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
];