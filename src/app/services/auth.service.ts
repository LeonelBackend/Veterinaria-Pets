import { Injectable, signal } from '@angular/core';
import { Usuario } from '../models/usuario.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly keyUsuarios = 'huellitas_usuarios_demo';
  private readonly keySesion = 'huellitas_sesion_demo';

  // Personal de la veterinaria (datos ficticios del prototipo)
  private readonly personal: Usuario[] = [
    { nombres: 'Recepción Huellitas', dni: '00000001', celular: '900000001', correo: 'recepcion@huellitas.pe', contrasena: 'Rec12345', rol: 'recepcionista' },
    { nombres: 'Dra. Veterinaria', dni: '00000002', celular: '900000002', correo: 'veterinario@huellitas.pe', contrasena: 'Vet12345', rol: 'veterinario' }
  ];

  usuarioActual = signal<Usuario | null>(this.leerSesion());
  correoRegistrado = signal('');

  existeCorreo(correo: string): boolean {
    return this.todos().some(u => u.correo === correo.toLowerCase());
  }

  registrar(datos: Omit<Usuario, 'rol'>): void {
    const usuarios = this.leerUsuarios();
    usuarios.push({ ...datos, correo: datos.correo.toLowerCase(), rol: 'dueno' });
    localStorage.setItem(this.keyUsuarios, JSON.stringify(usuarios));
    this.correoRegistrado.set(datos.correo.toLowerCase());
  }

  ingresar(correo: string, contrasena: string): boolean {
    const usuario = this.todos().find(u => u.correo === correo.toLowerCase() && u.contrasena === contrasena);
    if (!usuario) {
      return false;
    }
    this.usuarioActual.set(usuario);
    localStorage.setItem(this.keySesion, JSON.stringify(usuario));
    return true;
  }

  salir(): void {
    this.usuarioActual.set(null);
    localStorage.removeItem(this.keySesion);
  }

  private todos(): Usuario[] {
    return [...this.personal, ...this.leerUsuarios()];
  }

  private leerUsuarios(): Usuario[] {
    try {
      const raw = localStorage.getItem(this.keyUsuarios);
      return raw ? JSON.parse(raw) as Usuario[] : [];
    } catch {
      return [];
    }
  }

  private leerSesion(): Usuario | null {
    try {
      const raw = localStorage.getItem(this.keySesion);
      return raw ? JSON.parse(raw) as Usuario : null;
    } catch {
      return null;
    }
  }
}
