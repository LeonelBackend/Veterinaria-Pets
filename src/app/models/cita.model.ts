export type EstadoCita = 'Pendiente' | 'Confirmada' | 'En sala de espera' | 'Cancelada';

export interface Cita {
  id: number;
  dueno: string;     // correo del dueño que reservó
  mascota: string;
  especie: string;
  servicio: string;
  fecha: string;     // formato AAAA-MM-DD
  hora: string;      // formato HH:mm
  estado: EstadoCita;
}
