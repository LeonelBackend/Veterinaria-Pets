import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CitaService } from '../../services/cita.service';
import { Cita } from '../../models/cita.model';

@Component({
  selector: 'app-agenda-recepcion',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './agenda-recepcion.html',
})
export class AgendaRecepcion {
  readonly servicio = inject(CitaService);
  readonly auth = inject(AuthService);

  fechaSeleccionada = this.servicio.fechaHoy();
  readonly citaActualizada = signal<Cita | null>(null);

  get citas(): Cita[] {
    return this.servicio.listarPorFecha(this.fechaSeleccionada);
  }

  get totalEnEspera(): number {
    return this.citas.filter(c => c.estado === 'En sala de espera').length;
  }

  marcarLlegada(cita: Cita): void {
    this.servicio.marcarLlegada(cita.id);
    this.citaActualizada.set({ ...cita, estado: 'En sala de espera' });
  }

  puedeMarcarLlegada(cita: Cita): boolean {
    return cita.estado === 'Pendiente' || cita.estado === 'Confirmada';
  }

  colorEstado(cita: Cita): string {
    switch (cita.estado) {
      case 'Pendiente':
        return 'bg-warning text-dark';
      case 'Confirmada':
        return 'bg-success';
      case 'En sala de espera':
        return 'bg-info text-dark';
      default:
        return 'bg-secondary';
    }
  }
}
