import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';

import { PerfilService } from '../perfil/services/perfil';
import { perfilParams } from '../perfil/interfaces/perfil-interfaces';
import { UsuariosServices } from './services/usuarios-services';
import { usuariosParams } from './interfaces/usuarios-interfaces';


@Component({
  selector: 'app-usuarios',
  imports: [
    CardModule,
    ButtonModule,
    SelectModule,
    FormsModule,
    FloatLabel,
    InputTextModule,
    InputNumberModule
  ],
  standalone: true,
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css',
})
export class Usuarios implements OnInit {
  constructor(private perfilService: PerfilService, private usuariosServices: UsuariosServices) { }
  perfiles: any[] = [];
  perfilSeleccionado: any = null;
  Nombres: string | undefined;
  ApellidoP: string | undefined;
  ApellidoM: string | undefined;
  Usuario: string | undefined
  Telefono: number | null = null;
  Contrasena: string | undefined;
  correo: string | undefined;

  ngOnInit(): void {
    this.cargarPerfil();
  }

  cargarPerfil() {
    const parametros = {
      opcion: 1,
      perfil: ''
    };

    this.perfilService.getPerfil(parametros).subscribe({
      next: (response: any) => {
        console.log('Perfil cargado:', response);

        this.perfiles = response.results; // ✅ aquí está el array
      },
      error: (err) => console.error(err)
    });
  }

  agregarUsuario() {
    if (!this.perfilSeleccionado) {
      alert("Selecciona un perfil");
      return;
    }
    const parametros: usuariosParams = {
      usuario: this.Usuario || '',
      contraseña: this.Contrasena || '',
      nombre: this.Nombres || '',
      apellidoP: this.ApellidoP || '',
      apellidoM: this.ApellidoM || '',
      telefono: this.Telefono ,
      correo: this.correo || '',
      idPerfil: this.perfilSeleccionado || 0
    }

    this.usuariosServices.agregarUsuario(parametros).subscribe({
      next: (res: any) => {
        console.log("Usuario registrado:", res);
        alert("✅ Usuario registrado correctamente");

        // Limpiar formulario
        this.Nombres = '';
        this.ApellidoP = '';
        this.ApellidoM = '';
        this.Usuario = '';
        this.Telefono = null;
        this.Contrasena = '';
        this.correo = '';
        this.perfilSeleccionado = null;
      },
      error: (err: any) => {
        console.error("Error al registrar usuario:", err);
        alert("❌ Error al registrar usuario");
      }
    });
  }
  onPerfilChange(event: any) {
    console.log("Evento del select:", event);
    console.log("perfilSeleccionado:", this.perfilSeleccionado);
  }

}
