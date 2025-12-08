import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

// PrimeNG Modules
import { MenubarModule } from 'primeng/menubar';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import { MenuModule } from 'primeng/menu';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../auth/login/services/login';
import { NavbarComponent } from '../navbar/navbar';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MenubarModule,
    CardModule,
    ChartModule,
    TableModule,
    ButtonModule,
    AvatarModule,
    BadgeModule,
    RippleModule,
    TooltipModule,
    MenuModule,
    ConfirmDialogModule,
    ToastModule,
    NavbarComponent
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
  providers: [ConfirmationService, MessageService]
})
export class Dashboard implements OnInit {
  sidebarOpen = true;
  menuItems: MenuItem[] = [];
  topMenu: MenuItem[] = [];
  userInitial: string = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    const permisos = this.authService.permisos;

    const nombre = this.authService.usuario?.nombreUsuario || '';
    this.userInitial = nombre.charAt(0).toUpperCase();

    this.menuItems = permisos
      .filter(p => p.puedeVer === true)
      .map(p => ({
        label: p.nombreVentana,
        icon: this.getIcon(p.nombreVentana),
        routerLink: p.ruta
      }));
  }

  getIcon(nombreVentana: string): string {
    switch (nombreVentana.toLowerCase()) {
      case 'dashboard': return 'pi pi-home';
      case 'usuarios': return 'pi pi-users';
      case 'reportes': return 'pi pi-chart-bar';
      default: return 'pi pi-folder';
    }
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
}