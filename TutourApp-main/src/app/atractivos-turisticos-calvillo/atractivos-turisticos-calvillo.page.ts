import { Component, inject, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  arrowBackOutline,
  star,
  locationOutline,
  chevronForwardOutline,
  home,
  searchOutline,
  heartOutline,
  settingsOutline
} from 'ionicons/icons';
import { LUGARES, Lugar } from '../data/lugares.data';

@Component({
  selector: 'app-atractivos-turisticos-calvillo',
  templateUrl: './atractivos-turisticos-calvillo.page.html',
  styleUrls: ['./atractivos-turisticos-calvillo.page.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, IonContent, IonIcon]
})
export class AtractivosTuristicosCalvilloPage implements OnInit, OnDestroy {
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);

  categorias: string[] = ['Todos', 'Presas', 'Monumentos', 'Ecoturismo'];
  categoriaSeleccionada: string = 'Todos';

  todosLosAtractivos: Lugar[] = LUGARES.filter(l => {
    const cat = (l.category || '').toLowerCase().trim();
    return (
      cat.includes('atractiv') ||
      cat.includes('presa') ||
      cat.includes('monumento') ||
      cat.includes('parroquia') ||
      cat.includes('ecoturismo')
    );
  });

  atractivosFiltrados: Lugar[] = [];

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
      star,
      locationOutline,
      chevronForwardOutline,
      home,
      searchOutline,
      heartOutline,
      settingsOutline
    });
  }

  ngOnInit(): void {
    this.atractivosFiltrados = this.todosLosAtractivos;
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
      this.atractivosFiltrados = this.todosLosAtractivos;
    } else {
      this.atractivosFiltrados = this.todosLosAtractivos.filter(item =>
        item.category.toLowerCase().includes(cat.toLowerCase())
      );
    }
  }
}