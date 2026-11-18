import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Rol } from './models/usuario.model';
@Component({ selector: 'app-root', standalone: true, imports: [RouterOutlet, RouterLink, RouterLinkActive], templateUrl: './app.html' })
export class App {
  auth = inject(AuthService);
  private router = inject(Router);
  nombreRol: Record<Rol, string> = { dueno: 'Dueño', recepcionista: 'Recepcionista', veterinario: 'Veterinario' };

  salir() {
    this.auth.salir();
    this.router.navigate(['/login']);
  }
}
