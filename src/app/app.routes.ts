import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';
import { Historial } from './pages/historial/historial';
import { NuevaAtencion } from './pages/nueva-atencion/nueva-atencion';
import { Registro } from './pages/registro/registro';
import { Login } from './pages/login/login';
import { ReservarCita } from './pages/reservar-cita/reservar-cita';
import { MisCitas } from './pages/mis-citas/mis-citas';

export const routes: Routes = [
 {path: '', component: Inicio},
 {path: 'registro', component: Registro},
 {path: 'login', component: Login},
 {path: 'reservar', component: ReservarCita},
 {path: 'mis-citas', component: MisCitas},
 {path: 'historial', component: Historial},
 {path: 'atenciones/nueva', component: NuevaAtencion},
 {path: '**', redirectTo: ''}
];