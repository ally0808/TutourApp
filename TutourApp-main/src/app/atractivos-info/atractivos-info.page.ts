import { Component, inject, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  arrowBackOutline,
  chevronForwardOutline,
  compassOutline,
  home,
  search,
  heartOutline,
  settingsOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-atractivos-info',
  templateUrl: './atractivos-info.page.html',
  styleUrls: ['./atractivos-info.page.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, IonContent, IonIcon]
})
export class AtractivosInfoPage implements OnInit, OnDestroy {
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);

  fotosHero: string[] = [
    'assets/images/museo-nacional-de-calvillo.jpg',
    'assets/images/cascada-atractivos-turisticos.jpg',
    'assets/images/santuario.jpg'
  ];

  fotoActualIndex: number = 0;
  private timer: ReturnType<typeof setInterval> | undefined;

  constructor() {
    addIcons({
      arrowBackOutline,
      chevronForwardOutline,
      compassOutline,
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

  // --- LÓGICA DE NAVEGACIÓN IGUAL A HOME ---
  esRutaActiva(ruta: string): boolean {
  if (ruta === '/home') {
    // Mantiene "Inicio" activo en /home y dentro de la subvista de atractivos
    return this.router.url === '/home' || this.router.url.includes('atractivos');
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

  // --- CARRUSEL ---
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
}