import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CitaService } from '../../services/cita.service';
import { Cita } from '../../models/cita.model';

@Component({
  selector: 'app-mis-citas',
  imports: [RouterLink],
  templateUrl: './mis-citas.html',
  styleUrl: './mis-citas.css',
})
export class MisCitas {
  readonly servicio = inject(CitaService);

  confirmar(cita: Cita): void {
    this.servicio.cambiarEstado(cita.id, 'Confirmada');
  }

  cancelar(cita: Cita): void {
    if (confirm(`¿Seguro que deseas cancelar la cita de ${cita.mascota} del ${cita.fecha} a las ${cita.hora}?`)) {
      this.servicio.cambiarEstado(cita.id, 'Cancelada');
    }
  }

  colorEstado(cita: Cita): string {
    return { Pendiente: 'bg-warning text-dark', Confirmada: 'bg-success', Cancelada: 'bg-secondary' }[cita.estado];
  }
}