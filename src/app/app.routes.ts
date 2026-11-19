import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';
import { Historial } from './pages/historial/historial';
import { NuevaAtencion } from './pages/nueva-atencion/nueva-atencion';
import { Registro } from './pages/registro/registro';
import { Login } from './pages/login/login';
import { requiereRol } from './guards/auth.guard';
export const routes: Routes = [
 {path: '', component: Inicio},
 {path: 'registro', component: Registro},
 {path: 'login', component: Login},
 {path: 'historial', component: Historial, canActivate: [requiereRol('veterinario')]},
 {path: 'atenciones/nueva', component: NuevaAtencion, canActivate: [requiereRol('veterinario')]},
 {path: '**', redirectTo: ''}
];
