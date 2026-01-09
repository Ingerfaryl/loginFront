// navbar.component.ts
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

// PrimeNG Modules
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { PopoverModule } from 'primeng/popover';
import { DividerModule } from 'primeng/divider';
import { RippleModule } from 'primeng/ripple';

import { AuthService } from '../../auth/login/services/login';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MenubarModule,
    ButtonModule,
    AvatarModule,
    InputTextModule,
    PopoverModule,
    DividerModule,
    RippleModule
  ],
  templateUrl: './navbar.html'
})

export class NavbarComponent implements OnInit {
  userInitial: string = '';
  userName: string = '';
  userEmail: string = '';
  searchQuery: string = '';
  notificationCount: number = 3;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtener datos del usuario desde el servicio de autenticación
    const usuario = this.authService.usuario;
    
    if (usuario) {
      this.userName = usuario.nombreUsuario || 'Usuario';
      this.userEmail = usuario.correo || 'usuario@ejemplo.com';
      this.userInitial = this.userName.charAt(0).toUpperCase();
    } else {
      this.userName = 'Invitado';
      this.userEmail = 'invitado@ejemplo.com';
      this.userInitial = 'I';
    }
  }

  toggleSidebar(): void {
    // Emitir evento para toggle del sidebar
    console.log('Toggle sidebar');
  }

  goToProfile(popover: any): void {
    this.router.navigate(['/perfil']);
    popover.hide();
  }

  goToSettings(popover: any): void {
    this.router.navigate(['/configuracion']);
    popover.hide();
  }

  goToHelp(popover: any): void {
    this.router.navigate(['/ayuda']);
    popover.hide();
  }

  logout(popover: any): void {
    this.authService.clean();
    popover.hide();
    this.router.navigate(['/auth/login']);
  }
}