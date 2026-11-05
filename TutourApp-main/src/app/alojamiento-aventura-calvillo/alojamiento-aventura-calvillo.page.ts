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
  selector: 'app-alojamiento-aventura-calvillo',
  templateUrl: './alojamiento-aventura-calvillo.page.html',
  styleUrls: ['./alojamiento-aventura-calvillo.page.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, IonContent, IonIcon]
})
export class AlojamientoAventuraCalvilloPage implements OnInit, OnDestroy {
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);

  categorias: string[] = ['Todos', 'Hospedaje', 'Lugares Recreativos'];
  categoriaSeleccionada: string = 'Todos';

  todosLosAlojamientos: Lugar[] = LUGARES.filter(l => {
    const cat = (l.category || '').toLowerCase().trim();
    return (
      cat.includes('hospedaje') ||
      cat.includes('recreativ') ||
      cat.includes('hotel') ||
      cat.includes('cabaña')
    );
  });

  alojamientosFiltrados: Lugar[] = [];

  fotosHero: string[] = [
    'assets/images/el-manantial.png',
    'assets/images/yolihuani-relax-resort.png',
    'assets/images/la-lagunita.png'
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
    this.alojamientosFiltrados = this.todosLosAlojamientos;
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
      this.alojamientosFiltrados = this.todosLosAlojamientos;
    } else if (cat === 'Hospedaje') {
      this.alojamientosFiltrados = this.todosLosAlojamientos.filter(item =>
        item.category.toLowerCase().includes('hospedaje') || item.category.toLowerCase().includes('hotel')
      );
    } else if (cat === 'Lugares Recreativos') {
      this.alojamientosFiltrados = this.todosLosAlojamientos.filter(item =>
        item.category.toLowerCase().includes('recreativ') || item.category.toLowerCase().includes('aventura')
      );
    }
  }
}