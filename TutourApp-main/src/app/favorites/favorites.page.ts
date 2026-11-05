import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonIcon, NavController } from '@ionic/angular';
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
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  standalone: true,
  imports: [IonContent, IonIcon,  TranslatePipe]
})
export class FavoritesPage {
  private router = inject(Router);
  private navCtrl = inject(NavController);
  private favoritosService = inject(FavoritosService);

  readonly favoritos = this.favoritosService.lugaresFavoritos;

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
      settingsOutline,
    });
  }

  // 💡 Navegación directa al detalle enviando el origen 'favoritos'
  verDetalle(id: number | string): void {
    if (id !== undefined && id !== null && id !== '') {
      void this.navCtrl.navigateForward(['/detalle-empresa', id], {
        state: { origen: 'favoritos' }
      });
    }
  }

  verLugar(lugar: Lugar): void {
    this.verDetalle(lugar.id);
  }

  esRutaActiva(ruta: string): boolean {
    return this.router.url.includes(ruta);
  }

  irA(seccion: string): void {
    const rutas: Record<string, string> = {
      inicio: '/home',
      explorar: '/explore',
      favoritos: '/favorites',
      configuracion: '/configuracion'
    };
    const ruta = rutas[seccion];
    if (ruta) {
      void this.router.navigateByUrl(ruta);
    }
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