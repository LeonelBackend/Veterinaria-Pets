import { Injectable } from '@angular/core';
import { Cita, EstadoCita } from '../models/cita.model';

@Injectable({ providedIn: 'root' })
export class CitaService {
  readonly servicios = ['Consulta general', 'Vacunación', 'Desparasitación', 'Baño', 'Cirugía menor'];
  readonly horarios = ['09:00', '10:00', '11:00', '12:00', '15:00', '16:00', '17:00', '18:00'];
  private readonly key = 'huellitas_citas_demo';

  fechaHoy(): string {
    const d = new Date();
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    const dia = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${mes}-${dia}`;
  }

  // Lista las citas de un dueño, de la más próxima a la más lejana (HU04)
  listar(dueno: string): Cita[] {
    return this.obtener()
      .filter(c => c.dueno === dueno)
      .sort((a, b) => (a.fecha + a.hora).localeCompare(b.fecha + b.hora));
  }

  // Lista las citas programadas para una fecha ordenadas cronológicamente
  listarPorFecha(fecha: string): Cita[] {
    this.asegurarCitasIniciales(fecha);
    return this.obtener()
      .filter(c => c.fecha === fecha)
      .sort((a, b) => a.hora.localeCompare(b.hora));
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

  // Cambia el estado de una cita
  cambiarEstado(id: number, estado: EstadoCita): void {
    const citas = this.obtener();
    const cita = citas.find(c => c.id === id);
    if (cita) {
      cita.estado = estado;
      this.guardar(citas);
    }
  }

  // Registra la llegada del paciente en recepción para alertar al veterinario
  marcarLlegada(id: number): void {
    this.cambiarEstado(id, 'En sala de espera');
  }

  private asegurarCitasIniciales(fecha: string): void {
    const hoy = this.fechaHoy();
    if (fecha !== hoy) {
      return;
    }

    const citas = this.obtener();
    if (citas.some(c => c.fecha === hoy)) {
      return;
    }

    const demo: Cita[] = [
      {
        id: 1001,
        dueno: 'lucia.torres@correo.pe',
        mascota: 'Luna',
        especie: 'Perro',
        servicio: 'Consulta general',
        fecha: hoy,
        hora: '09:00',
        estado: 'Confirmada',
      },
      {
        id: 1002,
        dueno: 'carlos.mendoza@correo.pe',
        mascota: 'Michi',
        especie: 'Gato',
        servicio: 'Vacunación',
        fecha: hoy,
        hora: '10:00',
        estado: 'Pendiente',
      },
      {
        id: 1003,
        dueno: 'valeria.paredes@correo.pe',
        mascota: 'Rocky',
        especie: 'Perro',
        servicio: 'Desparasitación',
        fecha: hoy,
        hora: '11:00',
        estado: 'Confirmada',
      },
      {
        id: 1004,
        dueno: 'mateo.salazar@correo.pe',
        mascota: 'Nube',
        especie: 'Gato',
        servicio: 'Baño',
        fecha: hoy,
        hora: '15:00',
        estado: 'Pendiente',
      },
    ];

    this.guardar([...citas, ...demo]);
  }

  private guardar(citas: Cita[]): void {
    localStorage.setItem(this.key, JSON.stringify(citas));
  }

  private obtener(): Cita[] {
    try {
      const raw = localStorage.getItem(this.key);
      return raw ? (JSON.parse(raw) as Cita[]) : [];
    } catch {
      return [];
    }
  }
}
