import { Injectable } from '@angular/core';
import { Atencion, Mascota } from '../models/atencion.model';
@Injectable({providedIn: 'root'})
export class HistorialService {
 readonly mascotas: Mascota[] = [{id:1,nombre:'Luna',especie:'Perro',propietario:'Propietario de prueba'}, {id:2,nombre:'Michi',especie:'Gato',propietario:'Propietario de prueba'}];
 private readonly key = 'huellitas_atenciones_demo';
 listar(mascotaId: number): Atencion[] { return this.obtener().filter(a=>a.mascotaId===mascotaId).sort((a,b)=>b.fecha.localeCompare(a.fecha)); }
 registrar(datos: Omit<Atencion,'id'>): void { const actual = this.obtener(); actual.push({...datos,id:Date.now()}); localStorage.setItem(this.key,JSON.stringify(actual)); }
 private obtener(): Atencion[] {try {const raw=localStorage.getItem(this.key); return raw?JSON.parse(raw) as Atencion[]:[];} catch {return [];}}
}
