import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
@Component({standalone:true, imports:[RouterLink], templateUrl: './inicio.html'})
export class Inicio { readonly auth = inject(AuthService); }
