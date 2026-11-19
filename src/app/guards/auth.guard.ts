import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Rol } from '../models/usuario.model';

export const requiereRol = (...roles: Rol[]): CanActivateFn => () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const usuario = auth.usuarioActual();
  if (!usuario) return router.createUrlTree(['/login']);
  return roles.includes(usuario.rol) ? true : router.createUrlTree(['/']);
};
