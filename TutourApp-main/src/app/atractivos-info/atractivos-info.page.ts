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
  searchOutline,
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
    'assets/images/presa-codorniz.png',
    'assets/images/sierra-fria.png',
    'assets/images/parroquia-salitre.png'
  ];

  fotoActualIndex: number = 0;
  private timer: ReturnType<typeof setInterval> | undefined;

  constructor() {
    addIcons({
      arrowBackOutline,
      chevronForwardOutline,
      compassOutline,
      home,
      searchOutline,
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