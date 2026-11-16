export type EstadoCita = 'Pendiente' | 'Confirmada' | 'Cancelada';

export interface Cita {
  id: number;
  mascota: string;
  especie: string;
  servicio: string;
  fecha: string;   // formato AAAA-MM-DD
  hora: string;    // formato HH:mm
  estado: EstadoCita;
}