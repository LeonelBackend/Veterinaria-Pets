import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html'
})
export class Login {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  auth = inject(AuthService);

  formulario = this.fb.nonNullable.group({
    correo: [this.auth.correoRegistrado(), [Validators.required, Validators.email]],
    contrasena: ['', Validators.required]
  });

  errorLogin = signal(false);
  verContrasena = signal(false);

  mostrarError(campo: keyof typeof this.formulario.controls): boolean {
    const control = this.formulario.controls[campo];
    return control.invalid && (control.dirty || control.touched);
  }

  ingresar() {
    this.errorLogin.set(false);
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const { correo, contrasena } = this.formulario.getRawValue();
    if (!this.auth.ingresar(correo, contrasena)) {
      this.errorLogin.set(true);
      this.formulario.controls.contrasena.reset();
      return;
    }

    this.auth.correoRegistrado.set('');
    this.router.navigate(['/']);
  }
}
