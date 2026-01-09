import { Routes } from '@angular/router';
import { Dashboard } from './app/dashboard/dashboard';
import { AuthGuard } from './auth/auth-guard';
import { Reportes } from './app/reportes/reportes';
import { Usuarios } from './app/usuarios/usuarios';
import { PermisosGuard } from './auth/permisos-guard';
import { NoAuthGuard } from './auth/no-auth-guard';

export const routes: Routes = [
  {
    path: 'auth',
    canActivate: [NoAuthGuard],
    loadChildren: () =>
      import('./auth/auth-routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: 'dashboard',
    component: Dashboard,
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
        loadComponent: () =>
          import('./app/reportes/reportes').then(m => m.Reportes),
      }
    ]
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin-module').then((m) => m.AdminModule),
    canActivate: [PermisosGuard]
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
];
