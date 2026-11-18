export type Rol = 'dueno' | 'recepcionista' | 'veterinario';

export interface Usuario {
  nombres: string;
  dni: string;
  celular: string;
  correo: string;
  contrasena: string;
  rol: Rol;
}
