import { Component, inject, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  arrowBackOutline,
  restaurantOutline,
  chevronForwardOutline,
  home,
  search,
  heartOutline,
  settingsOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-gastronomia',
  templateUrl: './gastronomia.page.html',
  styleUrls: ['./gastronomia.page.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, IonContent, IonIcon]
})
export class GastronomiaPage implements OnInit, OnDestroy {
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  fotosHero: string[] = [
    'assets/images/gastronomia-banner-1.jpg',
    'assets/images/gastronomia-banner-2.jpg',
    'assets/images/gastronomia-banner-3.jpg',
    'assets/images/gastronomia-banner-4.jpg',
    'assets/images/gastronomia-banner-5.jpg',
    'assets/images/gastronomia-banner-6.jpg',
    'assets/images/gastronomia-banner-7.jpg',
    'assets/images/gastronomia-banner-8.jpg',
    'assets/images/gastronomia-banner-9.jpg',
    'assets/images/gastronomia-banner-10.jpg',
  ];

  fotoActualIndex = 0;
  private timer: ReturnType<typeof setInterval> | undefined;

  constructor() {
    addIcons({
      arrowBackOutline,
      restaurantOutline,
      chevronForwardOutline,
      home,
      search,
      heartOutline,
      settingsOutline
    });
  }

  ngOnInit(): void {
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

  verOpcionesCalvillo(): void {
    void this.router.navigate(['/gastronomia-calvillo']);
  }

  // --- LÓGICA DE NAVEGACIÓN ---
  esRutaActiva(ruta: string): boolean {
    if (ruta === '/home') {
      return this.router.url === '/home' || this.router.url.includes('gastronomia');
    }
    return this.router.url === ruta;
  }

  irA(seccion: string): void {
    const rutas: Record<string, string> = {
      inicio: '/home',
      explorar: '/explore',
      favoritos: '/favorites',
      configuracion: '/configuracion'
    };
    if (rutas[seccion]) {
      this.router.navigateByUrl(rutas[seccion]);
    }
  }
}