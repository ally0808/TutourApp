import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  inject
} from '@angular/core';

import { IonContent, IonIcon } from '@ionic/angular';

import { addIcons } from 'ionicons';

import {
  searchOutline,
  bedOutline,
  restaurantOutline,
  happyOutline,
  cafeOutline,
  fastFoodOutline,
  nutritionOutline,
  colorPaletteOutline,
  wineOutline,
  heart,
  heartOutline,
  home,
  compassOutline,
  settingsOutline,
  star,
  location,
  mapOutline,
  newspaperOutline,
  peopleOutline,
  chevronForwardOutline,
  bulbOutline,
} from 'ionicons/icons';

import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [IonContent, IonIcon]
})



export class HomePage implements AfterViewInit, OnDestroy {
  private router = inject(Router);

  irANavegacion(ruta: string): void {
    if (ruta === '/home' || ruta === '/explore') {
      this.router.navigateByUrl(ruta);
    }
  }

  toggleFavorite(empresa: any): void {
    empresa.isFavorite = !empresa.isFavorite;
  }

  bannerPresionado: string | null = null;

presionarBanner(banner: string): void {
  this.bannerPresionado = banner;
}

soltarBanner() {
  this.bannerPresionado = null;
}


  irACategoria(categoria: string): void {
    void this.router.navigate(['/explore'], { queryParams: { cat: categoria } });
  }

  irAGastronomia(): void {
    this.irACategoria('Restaurante');
  }

  irAlojamientoAventura(): void {
    this.irACategoria('Hospedaje');
  }

  irAtractivosTuristicos(): void {
    this.irACategoria('Lugares recreativos');
  }

  @ViewChild('featuredScroll')
  featuredScroll?: ElementRef<HTMLDivElement>;

  private carouselInterval: ReturnType<typeof setInterval> | undefined;
  private initTimeout: ReturnType<typeof setTimeout> | undefined;
  private isDragging = false;
  private startX = 0;
  private scrollLeft = 0;

  private touchStartX = 0;
  private touchEndX = 0;

  ngAfterViewInit() {
    this.initTimeout = setTimeout(() => {
      const container = this.featuredScroll?.nativeElement;
      if (!container) {
        return;
      }

      const tarjeta = container.querySelector('.business-card') as HTMLElement;
      if (!tarjeta) {
        return;
      }

      const distancia = tarjeta.offsetWidth + 12;
      const anchoBloque = distancia * this.empresas.length;

      // Empezamos en la segunda copia
      if (typeof container.scrollTo === 'function') {
        container.scrollTo({
          left: anchoBloque,
          behavior: 'auto'
        });
      } else {
        container.scrollLeft = anchoBloque;
      }

      this.carouselInterval = setInterval(() => {
        this.moverCarrusel();
      }, 3000);
    });
  }

  moverCarrusel() {
    const container = this.featuredScroll?.nativeElement;
    if (!container) {
      return;
    }

    const tarjeta = container.querySelector('.business-card') as HTMLElement;
    if (!tarjeta || this.empresas.length === 0) {
      return;
    }

    const distancia = tarjeta.offsetWidth + 12;
    const anchoBloque = distancia * this.empresas.length;

    // Cuando llegamos cerca del final de la segunda copia,
    // regresamos una copia hacia atrás de forma invisible.
    if (container.scrollLeft >= anchoBloque * 2 - distancia) {
      if (typeof container.scrollTo === 'function') {
        container.scrollTo({
          left: container.scrollLeft - anchoBloque,
          behavior: 'auto'
        });
      } else {
        container.scrollLeft = container.scrollLeft - anchoBloque;
      }
    }

    // Avanzar una empresa
    if (typeof container.scrollBy === 'function') {
      container.scrollBy({
        left: distancia,
        behavior: 'smooth'
      });
    } else {
      container.scrollLeft += distancia;
    }
  }

  iniciarArrastre(event: MouseEvent) {
    const container = this.featuredScroll?.nativeElement;
    if (!container) {
      return;
    }

    this.isDragging = true;
    this.startX = event.pageX - container.offsetLeft;
    this.scrollLeft = container.scrollLeft;

    container.classList.add('is-dragging');
  }

  moverArrastre(event: MouseEvent) {
    if (!this.isDragging) {
      return;
    }

    event.preventDefault();

    const container = this.featuredScroll?.nativeElement;
    if (!container) {
      return;
    }

    const x = event.pageX - container.offsetLeft;
    const distancia = (x - this.startX) * 1.2;

    container.scrollLeft = this.scrollLeft - distancia;
  }

  terminarArrastre() {
    if (!this.isDragging) {
      return;
    }

    this.isDragging = false;

    if (this.featuredScroll?.nativeElement) {
      this.featuredScroll.nativeElement.classList.remove('is-dragging');
    }
  }

  iniciarTouch(event: TouchEvent) {
    this.touchStartX = event.touches[0].clientX;
  }

  terminarTouch(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].clientX;

    const diferencia = this.touchStartX - this.touchEndX;

    // Solo reaccionar si realmente hubo un deslizamiento
    if (Math.abs(diferencia) < 30) {
      return;
    }

    const container = this.featuredScroll?.nativeElement;
    if (!container) {
      return;
    }

    const tarjeta = container.querySelector('.business-card') as HTMLElement;
    if (!tarjeta) {
      return;
    }

    const distancia = tarjeta.offsetWidth + 12;

    if (diferencia > 0) {
      // Deslizó hacia la izquierda
      if (typeof container.scrollBy === 'function') {
        container.scrollBy({
          left: distancia,
          behavior: 'smooth'
        });
      } else {
        container.scrollLeft += distancia;
      }
    } else {
      // Deslizó hacia la derecha
      if (typeof container.scrollBy === 'function') {
        container.scrollBy({
          left: -distancia,
          behavior: 'smooth'
        });
      } else {
        container.scrollLeft -= distancia;
      }
    }
  }

  ngOnDestroy() {
    if (this.initTimeout) {
      clearTimeout(this.initTimeout);
    }
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);
    }
  }

  empresas = [
    {
      nombre: 'Cabañas Don Chava',
      categoria: 'Hospedaje',
      calificacion: 5.0,
      direccion: 'Carretera al Maguey no. 201 El Sauz, Calvillo Aguascalientes',
      imagen: 'assets/images/cabanas-don-chava.png',
      isFavorite: false
    },
    {
      nombre: 'Panadería Don Emiliano',
      categoria: 'Sabores de mi pueblo',
      calificacion: 5.0,
      direccion: 'Calvillo, Aguascalientes',
      imagen: 'assets/images/panaderia-don-emiliano.png',
      isFavorite: false
    },
    {
      nombre: 'Grada Noventa y Seis',
      categoria: 'Bares',
      calificacion: 5.0,
      direccion: 'Matamoros 508, Zona Centro, Calvillo, Ags. (Las Graditas)',
      imagen: 'assets/images/grada-noventa-y-seis.png',
      isFavorite: false
    },
    {
      nombre: 'Restaurante Camino Viejo',
      categoria: 'Restaurante',
      calificacion: 5.0,
      direccion: 'Presa de Malpaso, Calvillo, Aguascalientes.',
      imagen: 'assets/images/restaurante-camino-viejo.png',
      isFavorite: false
    },
    {
      nombre: 'Yolihuani Relax Resort',
      categoria: 'Hospedaje',
      calificacion: 5.0,
      direccion: 'Carretera La Panadera-Palo Alto km 14, Calvillo, México.',
      imagen: 'assets/images/yolihuani-relax-resort.png',
      isFavorite: false
    },
  ];

  empresasCarrusel = [
    ...this.empresas,
    ...this.empresas,
    ...this.empresas
  ];

  constructor() {

    addIcons({
      bulbOutline,

      // Buscador
      searchOutline,

      // Categorías
      bedOutline,
      restaurantOutline,
      happyOutline,
      cafeOutline,
      fastFoodOutline,
      nutritionOutline,
      colorPaletteOutline,
      wineOutline,

      // Empresas destacadas
      heart,
      heartOutline,
      star,
      location,

      // Navegación inferior
      home,
      compassOutline,
      settingsOutline,

      // Descubre Calvillo
      mapOutline,
      newspaperOutline,
      peopleOutline,
      chevronForwardOutline

    });

  }

}

