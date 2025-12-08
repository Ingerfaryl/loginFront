import { Routes } from '@angular/router';
import { Dashboard } from './app/dashboard/dashboard';
import { AuthGuard } from './auth/auth-guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth-routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin-module').then((m) => m.AdminModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
];
