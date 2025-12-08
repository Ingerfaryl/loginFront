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

import { AuthService, LoginService } from './services/login';
import { LoginRequest } from './interfaces/login-request.interface';
import { LoginResponse } from './interfaces/login-response.interface';

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
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm: FormGroup;
  loading = false;
  serverError: string | null = null;

  constructor(private fb: FormBuilder, private router: Router, private loginService: LoginService, private authService: AuthService) {
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
          this.serverError = resp.message;
          return;
        }

        // Guardar usuario y permisos en localStorage
        this.authService.guardarDatos(resp.usuario, resp.permisos ?? []);

        // Redireccionar al dashboard
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.loading = false;
        this.serverError = 'Error en el servidor.';
        console.error(err);
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
