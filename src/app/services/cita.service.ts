import { Injectable } from '@angular/core';
import { Cita, EstadoCita } from '../models/cita.model';

@Injectable({ providedIn: 'root' })
export class CitaService {
  readonly servicios = ['Consulta general', 'Vacunación', 'Desparasitación', 'Baño', 'Cirugía menor'];
  readonly horarios = ['09:00', '10:00', '11:00', '12:00', '15:00', '16:00', '17:00', '18:00'];
  private readonly key = 'huellitas_citas_demo';

  // Lista las citas de un dueño, de la más próxima a la más lejana (HU04)
  listar(dueno: string): Cita[] {
    return this.obtener()
      .filter(c => c.dueno === dueno)
      .sort((a, b) => (a.fecha + a.hora).localeCompare(b.fecha + b.hora));
  }

  // Horas tomadas en una fecha; las canceladas no cuentan (HU03 y HU04)
  horasOcupadas(fecha: string): string[] {
    return this.obtener()
      .filter(c => c.fecha === fecha && c.estado !== 'Cancelada')
      .map(c => c.hora);
  }

  // Registra una cita nueva con estado Pendiente (HU03)
  reservar(datos: Omit<Cita, 'id' | 'estado'>): Cita {
    const citas = this.obtener();
    const nueva: Cita = { ...datos, id: Date.now(), estado: 'Pendiente' };
    citas.push(nueva);
    this.guardar(citas);
    return nueva;
  }

  // Cambia el estado de una cita: Confirmada o Cancelada (HU04)
  cambiarEstado(id: number, estado: EstadoCita): void {
    const citas = this.obtener();
    const cita = citas.find(c => c.id === id);
    if (cita) {
      cita.estado = estado;
      this.guardar(citas);
    }
  }

  private guardar(citas: Cita[]): void {
    localStorage.setItem(this.key, JSON.stringify(citas));
  }

  private obtener(): Cita[] {
    try {
      const raw = localStorage.getItem(this.key);
      return raw ? JSON.parse(raw) as Cita[] : [];
    } catch {
      return [];
    }
  }
}