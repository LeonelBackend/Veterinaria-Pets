import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';
import { Historial } from './pages/historial/historial';
import { NuevaAtencion } from './pages/nueva-atencion/nueva-atencion';
import { Registro } from './pages/registro/registro';
import { Login } from './pages/login/login';
import { ReservarCita } from './pages/reservar-cita/reservar-cita';
import { MisCitas } from './pages/mis-citas/mis-citas';
import { MisMascotas } from './pages/mis-mascotas/mis-mascotas';
import { AgendaRecepcion } from './pages/agenda-recepcion/agenda-recepcion';
import { requiereRol } from './guards/auth.guard';
export const routes: Routes = [
 {path: '', component: Inicio},
 {path: 'registro', component: Registro},
 {path: 'login', component: Login},
 {path: 'reservar', component: ReservarCita, canActivate: [requiereRol('dueno')]},
 {path: 'mis-citas', component: MisCitas, canActivate: [requiereRol('dueno')]},
 {path: 'mis-mascotas', component: MisMascotas, canActivate: [requiereRol('dueno')]},
 {path: 'agenda-recepcion', component: AgendaRecepcion, canActivate: [requiereRol('recepcionista')]},
 {path: 'historial', component: Historial, canActivate: [requiereRol('veterinario')]},
 {path: 'atenciones/nueva', component: NuevaAtencion, canActivate: [requiereRol('veterinario')]},
 {path: '**', redirectTo: ''}
];
