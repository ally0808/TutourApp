import { Component, inject, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { IonContent, IonFooter, IonIcon } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  arrowBackOutline,
  star,
  locationOutline,
  restaurantOutline,
  cafeOutline,
  moonOutline,
  chevronForwardOutline,
  home,
  searchOutline,
  heartOutline,
  settingsOutline
} from 'ionicons/icons';
import { LUGARES, Lugar } from '../data/lugares.data';

@Component({
  selector: 'app-gastronomia-calvillo',
  templateUrl: './gastronomia-calvillo.page.html',
  styleUrls: ['./gastronomia-calvillo.page.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, IonContent, IonFooter, IonIcon]
})
export class GastronomiaCalvilloPage implements OnInit, OnDestroy {
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);

  // Categorías de filtro
  categorias = ['Todos', 'Restaurantes', 'Cenadurías', 'Sabores de mi Pueblo', 'Bares'];
  categoriaSeleccionada = 'Todos';

  // Obtenemos todos los establecimientos gastronómicos
  todosLosRestaurantes: Lugar[] = LUGARES.filter(l => {
    const cat = (l.category || '').toLowerCase().trim();
    return (
      cat.includes('restauran') ||
      cat.includes('cena') ||
      cat.includes('sabores') ||
      cat.includes('pueblo') ||
      cat.includes('bar') ||
      cat.includes('caf') ||
      cat.includes('gastro')
    );
  });

  restaurantesFiltrados: Lugar[] = [];

  // Carrusel
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
      chevronForwardOutline,
      home,
      searchOutline,
      heartOutline,
      settingsOutline
    });
  }

  ngOnInit(): void {
    this.restaurantesFiltrados = this.todosLosRestaurantes;

    this.fotosHero = this.todosLosRestaurantes
      .map(r => r.image)
      .filter(img => !!img);

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

  // NAVEGACIÓN A DETALLE EMPRESA
  verDetalleEmpresa(id: number): void {
    void this.router.navigate(['/detalle-empresa'], {
      queryParams: { id }
    });
  }

  esRutaActiva(ruta: string): boolean {
    return this.router.url.includes(ruta);
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
    } else if (cat === 'Sabores de mi Pueblo') {
      this.restaurantesFiltrados = this.todosLosRestaurantes.filter(item => {
        const catLower = item.category.toLowerCase();
        return catLower.includes('sabores') || catLower.includes('pueblo') || catLower.includes('caf');
      });
    } else if (cat === 'Bares') {
      this.restaurantesFiltrados = this.todosLosRestaurantes.filter(item =>
        item.category.toLowerCase().includes('bar')
      );
    } else {
      this.restaurantesFiltrados = this.todosLosRestaurantes.filter(item =>
        item.category.toLowerCase().includes(cat.toLowerCase())
      );
    }
  }
}