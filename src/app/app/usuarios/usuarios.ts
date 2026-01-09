import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

import {PerfilService} from '../perfil/services/perfil';

@Component({
  selector: 'app-usuarios',
  imports: [
    CardModule,
    ButtonModule
  ],
  standalone: true,
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css',
})
export class Usuarios implements OnInit {
  constructor(private perfilService: PerfilService) {}
  ngOnInit(): void {
    this.cargarPerfil();
  }

  cargarPerfil() {
    const parametros = {
      opcion: 1,
      perfil: ''
    };
    this.perfilService.getPerfil(parametros).subscribe(response => {
      console.log('Perfil cargado:', response);
    }, error => {
      console.error('Error al cargar el perfil:', error);
    });
  }
}
