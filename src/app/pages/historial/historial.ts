import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HistorialService } from '../../services/historial.service';

@Component({
  standalone: true,
  imports: [FormsModule],
  templateUrl: './historial.html'
})
export class Historial {
  readonly servicio = inject(HistorialService);
  mascotaId = 1;
  busqueda = '';

  get atenciones() {
    const termino = this.busqueda.trim().toLowerCase();
    return this.servicio.listar(Number(this.mascotaId)).filter(a => !termino || `${a.fecha} ${a.diagnostico} ${a.tratamiento} ${a.observaciones}`.toLowerCase().includes(termino));
  }

  get mascotaSeleccionada() { return this.servicio.mascotas.find(m => m.id === Number(this.mascotaId)); }
}
