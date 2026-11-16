import { Injectable, computed, signal } from '@angular/core';
import { Cita, EstadoCita } from '../models/cita.model';

@Injectable({ providedIn: 'root' })
export class CitaService {
  readonly servicios = ['Consulta general', 'Vacunación', 'Desparasitación', 'Baño', 'Cirugía menor'];
  readonly horarios = ['09:00', '10:00', '11:00', '12:00', '15:00', '16:00', '17:00', '18:00'];

  private readonly key = 'huellitas_citas_demo';
  private readonly citas = signal<Cita[]>(this.leer());

  // Citas ordenadas de la más próxima a la más lejana (HU04)
  readonly citasOrdenadas = computed(() =>
    [...this.citas()].sort((a, b) => (a.fecha + a.hora).localeCompare(b.fecha + b.hora))
  );

  // Horas ya tomadas en una fecha; las canceladas liberan el horario (HU03 y HU04)
  horasOcupadas(fecha: string): string[] {
    return this.citas()
      .filter(c => c.fecha === fecha && c.estado !== 'Cancelada')
      .map(c => c.hora);
  }

  reservar(datos: Omit<Cita, 'id' | 'estado'>): Cita {
    const nueva: Cita = { ...datos, id: Date.now(), estado: 'Pendiente' };
    this.guardar([...this.citas(), nueva]);
    return nueva;
  }

  cambiarEstado(id: number, estado: EstadoCita): void {
    this.guardar(this.citas().map(c => (c.id === id ? { ...c, estado } : c)));
  }

  private guardar(lista: Cita[]): void {
    this.citas.set(lista);
    localStorage.setItem(this.key, JSON.stringify(lista));
  }

  private leer(): Cita[] {
    try {
      const raw = localStorage.getItem(this.key);
      return raw ? (JSON.parse(raw) as Cita[]) : [];
    } catch {
      return [];
    }
  }
}