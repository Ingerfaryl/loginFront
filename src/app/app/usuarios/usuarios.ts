import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { TableModule } from 'primeng/table';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import { PerfilService } from '../perfil/services/perfil';
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
    InputNumberModule,
    TableModule
  ],
  standalone: true,
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css',
})
export class Usuarios implements OnInit {
  constructor(
    private perfilService: PerfilService,
    private usuariosServices: UsuariosServices,
    private cdr: ChangeDetectorRef) { }
  perfiles: any[] = [];
  usuarios: any[] = [];
  perfilSeleccionado: any = null;
  Nombres: string | undefined;
  ApellidoP: string | undefined;
  ApellidoM: string | undefined;
  Usuario: string | undefined
  Telefono: string | undefined;
  Contrasena: string | undefined;
  correo: string | undefined;

  ngOnInit(): void {
    this.cargarPerfil();
    this.cargarUsuarios();
  }

  cargarPerfil() {
    const parametros = {
      opcion: 1,
      perfil: ''
    };

    this.perfilService.getPerfil(parametros).subscribe({
      next: (response: any) => {
        console.log('Perfil cargado:', response);
        this.perfiles = response.results;
        this.cdr.detectChanges();
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
      telefono: this.Telefono ? this.Telefono.toString() : '',
      correo: this.correo || '',
      idPerfil: this.perfilSeleccionado || 0
    }

    this.usuariosServices.agregarUsuario(parametros).subscribe({
      next: (res: any) => {
        console.log("Usuario registrado:", res);
        alert("✅ Usuario registrado correctamente");

        this.Nombres = '';
        this.ApellidoP = '';
        this.ApellidoM = '';
        this.Usuario = '';
        this.Telefono = '';
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

  cargarUsuarios() {

    const parametros = {
      opcion: 1
    };

    this.usuariosServices.mostrarUsuarios(parametros).subscribe({
      next: (response: any) => {
        console.log("Usuarios:", response);
        this.usuarios = response.results;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error("Error al cargar usuarios", err);
      }
    });

  }
  exportarPDF() {
    //console.log("CLICK PDF");
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text('Lista de Usuarios', 14, 15);

    autoTable(doc, {
      startY: 25,
      head: [['Usuario', 'Nombre', 'Apellido P', 'Apellido M', 'Correo', 'Teléfono', 'Activo']],
      body: this.usuarios.map(u => [
        u.usuario,
        u.nombre,
        u.apellido_p,
        u.apellido_m,
        u.correo,
        u.telefono,
        u.flgActivo ? 'Sí' : 'No'
      ]),
      styles: { fontSize: 9 },
      headStyles: { fillColor: [41, 128, 185] }
    });

    doc.save('usuarios.pdf');
  }
}
