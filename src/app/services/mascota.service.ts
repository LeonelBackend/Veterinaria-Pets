import { Injectable } from '@angular/core';
import { PerfilMascota } from '../models/mascota.model';

@Injectable({ providedIn: 'root' })
export class MascotaService {
  readonly especies = ['Perro', 'Gato', 'Otro'];
  private readonly key = 'huellitas_mascotas_demo';

  listarPorDueno(correo: string): PerfilMascota[] {
    const dueno = correo.trim().toLowerCase();
    return this.obtener().filter(m => m.dueno === dueno);
  }

  registrar(datos: Omit<PerfilMascota, 'id'>): PerfilMascota {
    const mascotas = this.obtener();
    const nueva: PerfilMascota = {
      ...datos,
      dueno: datos.dueno.trim().toLowerCase(),
      id: Date.now(),
    };
    mascotas.push(nueva);
    localStorage.setItem(this.key, JSON.stringify(mascotas));
    return nueva;
  }

  private obtener(): PerfilMascota[] {
    try {
      const raw = localStorage.getItem(this.key);
      return raw ? (JSON.parse(raw) as PerfilMascota[]) : [];
    } catch {
      return [];
    }
  }
}
