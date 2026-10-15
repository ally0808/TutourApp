import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  heart,
  heartOutline,
  star,
  locationOutline,
  chevronForwardOutline,
  home,
  search,
  settingsOutline
} from 'ionicons/icons';

import { Lugar } from '../data/lugares.data';
import { FavoritosService } from '../services/favoritos.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  standalone: true,
  imports: [IonContent, IonIcon]
})
export class FavoritesPage {
  private router = inject(Router);
  private favoritosService = inject(FavoritosService);

  /** Lista reactiva: se actualiza sola al agregar/quitar desde cualquier vista. */
  readonly favoritos = this.favoritosService.lugaresFavoritos;

  // Visor de imágenes
  imagenAmpliada: string | null = null;
  nombreImagenAmpliada = '';

  constructor() {
    addIcons({
      heart,
      heartOutline,
      star,
      locationOutline,
      chevronForwardOutline,
      home,
      search,
      settingsOutline
    });
  }

  // Navegación
  esRutaActiva(ruta: string): boolean {
    return this.router.url.includes(ruta);
  }

  irA(seccion: string): void {
    const rutas: Record<string, string> = {
      inicio: '/home',
      explorar: '/explore',
      favoritos: '/favorites',
      configuracion: '/home'
    };

    const ruta = rutas[seccion];
    if (ruta) {
      void this.router.navigateByUrl(ruta);
    }
  }

  // Abre el lugar en Explorar (vista de mapa)
  verLugar(lugar: Lugar): void {
    void this.router.navigate(['/explore'], { queryParams: { lugar: lugar.id } });
  }

  quitarFavorito(id: number, event?: Event): void {
    event?.stopPropagation();
    this.favoritosService.quitar(id);
  }

  ampliarImagen(imagen: string, nombre: string, event?: Event): void {
    event?.stopPropagation();
    this.imagenAmpliada = imagen;
    this.nombreImagenAmpliada = nombre;
  }

  cerrarImagen(): void {
    this.imagenAmpliada = null;
    this.nombreImagenAmpliada = '';
  }
}
