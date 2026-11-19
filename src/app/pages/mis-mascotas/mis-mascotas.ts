import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MascotaService } from '../../services/mascota.service';
import { PerfilMascota } from '../../models/mascota.model';

@Component({
  selector: 'app-mis-mascotas',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './mis-mascotas.html',
})
export class MisMascotas {
  readonly servicio = inject(MascotaService);
  readonly auth = inject(AuthService);
  private readonly fb = inject(FormBuilder);

  readonly mascotaRegistrada = signal<PerfilMascota | null>(null);

  readonly form = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    especie: ['', Validators.required],
    raza: ['', Validators.required],
    peso: ['', [Validators.required, Validators.min(0.1)]],
    edad: ['', Validators.required],
  });

  get mascotas(): PerfilMascota[] {
    return this.servicio.listarPorDueno(this.auth.usuarioActual()?.correo ?? '');
  }

  mostrarError(campo: keyof typeof this.form.controls): boolean {
    const control = this.form.controls[campo];
    return control.invalid && (control.dirty || control.touched);
  }

  guardar(): void {
    this.mascotaRegistrada.set(null);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const usuario = this.auth.usuarioActual();
    if (!usuario) {
      return;
    }

    const valores = this.form.getRawValue();
    const registrada = this.servicio.registrar({
      dueno: usuario.correo,
      propietario: usuario.nombres,
      nombre: valores.nombre.trim(),
      especie: valores.especie,
      raza: valores.raza.trim(),
      peso: Number(valores.peso),
      edad: valores.edad.trim(),
    });

    this.mascotaRegistrada.set(registrada);
    this.form.reset();
  }
}
