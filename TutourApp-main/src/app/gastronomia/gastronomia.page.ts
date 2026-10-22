import { Component, inject, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { arrowBackOutline, restaurantOutline, chevronForwardOutline } from 'ionicons/icons';

@Component({
  selector: 'app-gastronomia',
  templateUrl: './gastronomia.page.html',
  styleUrls: ['./gastronomia.page.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, IonContent, IonIcon]
})
export class GastronomiaPage implements OnInit, OnDestroy {
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef); // 👈 Forzar renderizado en pantalla

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
  private timer: any;

  constructor() {
    addIcons({ arrowBackOutline, restaurantOutline, chevronForwardOutline });
  }

  ngOnInit(): void {
    this.iniciarCarrusel();
  }

  // Ciclos de vida nativos de Ionic
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
} 