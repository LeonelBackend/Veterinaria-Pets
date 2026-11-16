import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CitaService } from '../../services/cita.service';
import { Cita } from '../../models/cita.model';

// Fecha de hoy en formato AAAA-MM-DD (hora local)
function hoy(): string {
  const d = new Date();
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
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

  // Cada vez que cambia la fecha, se recalculan las horas ocupadas
  private readonly fecha = toSignal(this.form.controls.fecha.valueChanges, { initialValue: '' });
  readonly ocupadas = computed(() => this.servicio.horasOcupadas(this.fecha()));

  constructor() {
    // Si cambia la fecha, la hora elegida ya no es válida
    this.form.controls.fecha.valueChanges.subscribe(() => this.form.controls.hora.setValue(''));
  }

  reservar(): void {
    this.citaReservada.set(null);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const v = this.form.getRawValue();
    const cita = this.servicio.reservar({
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