import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './registro.html'
})
export class Registro {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  formulario = this.fb.nonNullable.group({
    nombres: ['', [Validators.required, Validators.minLength(3)]],
    dni: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
    celular: ['', [Validators.required, Validators.pattern('^9[0-9]{8}$')]],
    correo: ['', [Validators.required, Validators.email]],
    contrasena: ['', [Validators.required, Validators.minLength(6)]],
    acepta: [false, Validators.requiredTrue]
  });

  correoDuplicado = signal(false);
  verContrasena = signal(false);

  mostrarError(campo: keyof typeof this.formulario.controls): boolean {
    const control = this.formulario.controls[campo];
    return control.invalid && (control.dirty || control.touched);
  }

  esCampoValido(campo: keyof typeof this.formulario.controls): boolean {
    const control = this.formulario.controls[campo];
    return control.valid && (control.dirty || control.touched);
  }

  registrarme() {
    this.correoDuplicado.set(false);
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const { acepta, ...datos } = this.formulario.getRawValue();
    if (this.auth.existeCorreo(datos.correo)) {
      this.correoDuplicado.set(true);
      return;
    }

    this.auth.registrar(datos);
    this.router.navigate(['/login']);
  }
}
