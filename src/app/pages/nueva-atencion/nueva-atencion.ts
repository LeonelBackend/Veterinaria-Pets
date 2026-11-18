import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HistorialService } from '../../services/historial.service';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './nueva-atencion.html'
})
export class NuevaAtencion {
  readonly servicio = inject(HistorialService);
  private readonly fb = inject(FormBuilder);
  guardado = false;

  readonly form = this.fb.nonNullable.group({
    mascotaId: [1, Validators.required],
    fecha: ['', Validators.required],
    diagnostico: ['', Validators.required],
    tratamiento: ['', Validators.required],
    observaciones: ['']
  });

  guardar() {
    this.guardado = false;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.servicio.registrar(this.form.getRawValue());
    this.guardado = true;
    this.form.patchValue({fecha: '', diagnostico: '', tratamiento: '', observaciones: ''});
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }
}
