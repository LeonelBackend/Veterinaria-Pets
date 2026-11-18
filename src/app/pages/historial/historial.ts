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

  get atenciones() {
    return this.servicio.listar(Number(this.mascotaId));
  }
}
