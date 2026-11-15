import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';
import { Historial } from './pages/historial/historial';
import { NuevaAtencion } from './pages/nueva-atencion/nueva-atencion';
export const routes: Routes = [
 {path: '', component: Inicio},
 {path: 'historial', component: Historial},
 {path: 'atenciones/nueva', component: NuevaAtencion},
 {path: '**', redirectTo: ''}
];
