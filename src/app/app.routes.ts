import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';
import { Historial } from './pages/historial/historial';
import { NuevaAtencion } from './pages/nueva-atencion/nueva-atencion';
import { ReservarCita } from './pages/reservar-cita/reservar-cita';
import { MisCitas } from './pages/mis-citas/mis-citas';
export const routes: Routes = [
 {path: '', component: Inicio},
 {path: 'historial', component: Historial},
 {path: 'atenciones/nueva', component: NuevaAtencion},
 {path: 'reservar', component: ReservarCita},
 {path: 'mis-citas', component: MisCitas},
 {path: '**', redirectTo: ''}
];
