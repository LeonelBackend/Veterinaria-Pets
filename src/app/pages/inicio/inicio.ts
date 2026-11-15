import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({standalone:true, imports:[RouterLink],template:`<section class="p-4 bg-white rounded-3"><h1>Veterinaria Huellitas</h1><p class="lead">Prototipo académico de los módulos HU07 y HU08.</p><p>Selecciona una funcionalidad:</p><a routerLink="/historial" class="btn btn-outline-success me-2">Consultar historial</a><a routerLink="/atenciones/nueva" class="btn btn-success">Registrar atención</a></section>`})
export class Inicio {}
