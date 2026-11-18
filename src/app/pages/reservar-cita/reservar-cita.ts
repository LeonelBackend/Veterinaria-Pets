import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CitaService } from '../../services/cita.service';
import { AuthService } from '../../services/auth.service';
import { Cita } from '../../models/cita.model';

// Fecha de hoy en formato AAAA-MM-DD
function hoy(): string {
  const d = new Date();
  const mes = String(d.getMonth() + 1).padStart(2, '0');
  const dia = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${mes}-${dia}`;
}

// Validador: no permite fechas pasadas
function fechaNoPasada(control: AbstractControl): ValidationErrors | null {
  return control.value && control.value < hoy() ? { fechaPasada: true } : null;
}

@Component({
  selector: 'app-reservar-cita',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './reservar-cita.html',
  styleUrl: './reservar-cita.css',
})
export class ReservarCita {
  readonly servicio = inject(CitaService);
  readonly auth = inject(AuthService);
  private readonly fb = inject(FormBuilder);

  readonly fechaMinima = hoy();
  readonly citaReservada = signal<Cita | null>(null);

  readonly form = this.fb.nonNullable.group({
    mascota: ['', [Validators.required, Validators.minLength(2)]],
    especie: ['', Validators.required],
    tipoServicio: ['', Validators.required],
    fecha: ['', [Validators.required, fechaNoPasada]],
    hora: ['', Validators.required],
  });

  // Devuelve true si la hora ya está tomada en la fecha elegida
  estaOcupada(hora: string): boolean {
    return this.servicio.horasOcupadas(this.form.controls.fecha.value).includes(hora);
  }

  reservar(): void {
    this.citaReservada.set(null);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const v = this.form.getRawValue();

    // Si la hora ya está ocupada, no se reserva
    if (this.estaOcupada(v.hora)) {
      this.form.controls.hora.setValue('');
      this.form.controls.hora.markAsTouched();
      return;
    }

    const cita = this.servicio.reservar({
      dueno: this.auth.usuarioActual()?.correo ?? '',
      mascota: v.mascota.trim(),
      especie: v.especie,
      servicio: v.tipoServicio,
      fecha: v.fecha,
      hora: v.hora,
    });
    this.citaReservada.set(cita);
    this.form.reset();
  }
}