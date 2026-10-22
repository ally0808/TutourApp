import { Component, inject, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  arrowBackOutline,
  star,
  locationOutline,
  restaurantOutline,
  cafeOutline,
  moonOutline,
  chevronForwardOutline
} from 'ionicons/icons';
import { LUGARES, Lugar } from '../data/lugares.data';

@Component({
  selector: 'app-gastronomia-calvillo',
  templateUrl: './gastronomia-calvillo.page.html',
  styleUrls: ['./gastronomia-calvillo.page.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, IonContent, IonIcon]
})
export class GastronomiaCalvilloPage implements OnInit, OnDestroy {
  private cdr = inject(ChangeDetectorRef);

  // Categorías de filtro
  categorias = ['Todos', 'Restaurantes', 'Cenadurías', 'Cafés y Postres'];
  categoriaSeleccionada = 'Todos';

  // Obtenemos solo los lugares gastronómicos de lugares.data.ts
  todosLosRestaurantes: Lugar[] = LUGARES.filter(l =>
    ['restaurantes', 'restaurante', 'cenaduría', 'cenadurías', 'gastronomía', 'cafetería'].includes(l.category.toLowerCase())
  );

  restaurantesFiltrados: Lugar[] = [];

  // Carrusel superior con las fotos de los negocios gastronómicos
  fotosHero: string[] = [];
  fotoActualIndex = 0;
  private timer: ReturnType<typeof setInterval> | undefined;

  constructor() {
    addIcons({
      arrowBackOutline,
      star,
      locationOutline,
      restaurantOutline,
      cafeOutline,
      moonOutline,
      chevronForwardOutline
    });
  }

  ngOnInit(): void {
    this.restaurantesFiltrados = this.todosLosRestaurantes;

    // Extraemos las imágenes de las empresas gastronómicas para el carrusel
    this.fotosHero = this.todosLosRestaurantes
      .map(r => r.image)
      .filter(img => !!img);

    // Si hay pocas fotos en la data, agregamos fotos por defecto
    if (this.fotosHero.length === 0) {
      this.fotosHero = ['assets/images/banner-gastronomia.jpg'];
    }

    this.iniciarCarrusel();
  }

  ionViewDidEnter(): void {
    this.iniciarCarrusel();
  }

  ionViewWillLeave(): void {
    this.detenerCarrusel();
  }

  ngOnDestroy(): void {
    this.detenerCarrusel();
  }

  iniciarCarrusel(): void {
    this.detenerCarrusel();
    if (this.fotosHero.length <= 1) return;

    this.timer = setInterval(() => {
      this.fotoActualIndex = (this.fotoActualIndex + 1) % this.fotosHero.length;
      this.cdr.detectChanges();
    }, 3000);
  }

  detenerCarrusel(): void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = undefined;
    }
  }

  cambiarFoto(index: number): void {
    this.fotoActualIndex = index;
    this.cdr.detectChanges();
    this.iniciarCarrusel();
  }

  seleccionarCategoria(cat: string): void {
    this.categoriaSeleccionada = cat;

    if (cat === 'Todos') {
      this.restaurantesFiltrados = this.todosLosRestaurantes;
    } else if (cat === 'Restaurantes') {
      this.restaurantesFiltrados = this.todosLosRestaurantes.filter(item =>
        item.category.toLowerCase().includes('restauran')
      );
    } else if (cat === 'Cenadurías') {
      this.restaurantesFiltrados = this.todosLosRestaurantes.filter(item =>
        item.category.toLowerCase().includes('cena')
      );
    } else if (cat === 'Cafés y Postres') {
      this.restaurantesFiltrados = this.todosLosRestaurantes.filter(item => {
        const catLower = item.category.toLowerCase();
        return catLower.includes('caf') || catLower.includes('postre') || catLower.includes('dulce');
      });
    } else {
      this.restaurantesFiltrados = this.todosLosRestaurantes.filter(item =>
        item.category.toLowerCase().includes(cat.toLowerCase())
      );
    }
  }
}