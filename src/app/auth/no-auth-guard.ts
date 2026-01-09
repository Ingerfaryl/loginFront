import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './login/services/login';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {

    // Si ya hay sesión, redirige al dashboard
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
      return false;
    }

    // Si no hay sesión, permite entrar al login
    return true;
  }
}
