import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

// PrimeNG Modules
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';


import { AuthService, LoginService } from './services/login';
import { LoginRequest } from './interfaces/login-request.interface';
import { LoginResponse } from './interfaces/login-response.interface';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    CheckboxModule,
    MessageModule,
    ToastModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
  providers: [MessageService]
})
export class Login {
  loginForm: FormGroup;
  loading = false;
  serverError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private authService: AuthService,
    private messageService: MessageService) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false],
    });
  }

  onSubmit() {
  if (this.loginForm.invalid) {
    Object.keys(this.loginForm.controls).forEach((key) => {
      this.loginForm.get(key)?.markAsTouched();
    });
    return;
  }

  this.loading = true;
  this.serverError = null;

  const request: LoginRequest = {
    usuario: this.loginForm.value.username,
    contraseña: this.loginForm.value.password,
  };

  this.loginService.login(request).subscribe({
    next: (resp: LoginResponse) => {
      this.loading = false;

      if (!resp.success) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: resp.message || 'Credenciales incorrectas'
        });
        return;
      }

      // Guardar usuario y permisos
      this.authService.guardarDatos(resp.usuario, resp.permisos ?? []);

      // Mostrar mensaje de éxito
      this.messageService.add({
        severity: 'success',
        summary: 'Bienvenido',
        detail: `Hola ${resp.usuario?.nombreUsuario || 'usuario'}!`
      });

      // Delay para que el toast se vea antes de navegar
      setTimeout(() => {
        this.router.navigate(['/dashboard']);
      }, 1000);  // <--- AJUSTA COMO QUIERAS (800 a 1200 recomendado)
    },

    error: () => {
      this.loading = false;
      this.messageService.add({
        severity: 'error',
        summary: 'Servidor',
        detail: 'Ocurrió un error en el servidor'
      });
    }
  });
}


  isInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field?.invalid && field?.touched);
  }

  get password() {
    return this.loginForm.get('password');
  }
}
