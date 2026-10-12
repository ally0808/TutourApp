import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  OnInit,
  inject // <-- Agregamos inject aquí
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import {
  DomSanitizer,
  SafeResourceUrl
} from '@angular/platform-browser';

interface Categoria {
  name: string;
  color: string;
}

interface Lugar {
  id: number;
  name: string;
  category: string;
  color: string;
  rating: string;
  reviews: string;
  location: string;
  image: string;
}

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
  standalone: true,
  // Se agregó IonicModule aquí para que el HTML reconozca <ion-content>
  imports: [
    CommonModule,
    FormsModule,
  ]
})
export class ExplorePage implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('categoryCarousel')
  categoryCarousel?: ElementRef<HTMLDivElement>;

  // Carrusel automático
  autoScrollInterval: ReturnType<typeof setInterval> | undefined;
  resumeTimeout: ReturnType<typeof setTimeout> | undefined;

  // Búsqueda y categorías
  busqueda = '';
  categoriaSeleccionada = 'Todos';

  // Vista actual
  vistaActual: 'lista' | 'mapa' = 'lista';

  // Visor de imágenes
  imagenAmpliada: string | null = null;
  nombreImagenAmpliada = '';

  // Favoritos guardados en el dispositivo
  favoritos: number[] = [];
  private readonly claveFavoritos = 'tutour-favoritos';

  // Mapa de Calvillo
  mapaUrl: SafeResourceUrl;

  // --- INYECCIÓN DE DEPENDENCIAS MODERNA ---
  private sanitizer = inject(DomSanitizer);
  private router = inject(Router);

  // Categorías del carrusel
  categories: Categoria[] = [
    { name: 'Todos', color: '#FCD846' },
    { name: 'Restaurante', color: '#CB7246' },
    { name: 'Desayunos', color: '#A8CF45' },
    { name: 'Hospedaje', color: '#5CC6D0' },
    { name: 'Artesanías', color: '#660066' },
    { name: 'Bares', color: '#F06277' },
    { name: 'Sabores de mi Pueblo', color: '#FAA954' },
    { name: 'Ecoturismo', color: '#2E9D65' },
    { name: 'Aventura', color: '#8055C7' },
    { name: 'Cultura', color: '#477ED8' },
    { name: 'Eventos', color: '#D95C9B' },
    { name: 'Tradiciones', color: '#B97840' }
  ];

  // Establecimientos de ejemplo
  places: Lugar[] = [
    {
      id: 1,
      name: 'Cabañas Don Chava',
      category: 'Hospedaje',
      color: '#5CC6D0',
      rating: '4.9',
      reviews: '1200',
      location: 'Calvillo, Aguascalientes',
      image: 'assets/images/cabanas.jpg'
    },
    {
      id: 2,
      name: 'Grada Noventa y Seis',
      category: 'Bares',
      color: '#F06277',
      rating: '4.8',
      reviews: '500',
      location: 'Calvillo, Aguascalientes',
      image: 'assets/images/grada.jpg'
    },
    {
      id: 3,
      name: 'Panadería Don Emiliano',
      category: 'Sabores de mi Pueblo',
      color: '#FAA954',
      rating: '5.0',
      reviews: '300',
      location: 'Calvillo, Aguascalientes',
      image: 'assets/images/panaderia.jpg'
    },
    {
      id: 4,
      name: 'Restaurante Camino Viejo',
      category: 'Restaurante',
      color: '#CB7246',
      rating: '5.0',
      reviews: '250',
      location: 'Calvillo, Aguascalientes',
      image: 'assets/images/camino-viejo.jpg'
    },
    {
      id: 5,
      name: 'Yolihuani Relax Resort',
      category: 'Hospedaje',
      color: '#5CC6D0',
      rating: '5.0',
      reviews: '180',
      location: 'Calvillo, Aguascalientes',
      image: 'assets/images/yolihuani.jpg'
    }
  ];

  // Constructor limpio sin parámetros
  constructor() {
    this.mapaUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.google.com/maps?q=Calvillo%2C%20Aguascalientes&output=embed'
    );
  }

  ngOnInit(): void {
    this.cargarFavoritos();
  }

  ngAfterViewInit(): void {
    this.startCarousel();
  }

  ngOnDestroy(): void {
    this.stopCarousel();
  }

  get lugaresFiltrados(): Lugar[] {
    const texto = this.normalizar(this.busqueda);

    return this.places.filter((place) => {
      const coincideCategoria =
        this.categoriaSeleccionada === 'Todos' ||
        place.category === this.categoriaSeleccionada;

      const contenido = this.normalizar(
        `${place.name} ${place.category} ${place.location}`
      );

      const coincideBusqueda = contenido.includes(texto);

      return coincideCategoria && coincideBusqueda;
    });
  }

  private normalizar(texto: string): string {
    return texto
      .toLocaleLowerCase('es-MX')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  }

  seleccionarCategoria(nombre: string): void {
    this.categoriaSeleccionada = nombre;
  }

  cambiarVista(vista: 'lista' | 'mapa'): void {
    this.vistaActual = vista;
  }

  startCarousel(): void {
    if (this.autoScrollInterval) {
      return;
    }

    this.autoScrollInterval = setInterval(() => {
      const elemento = this.categoryCarousel?.nativeElement;

      if (!elemento) {
        return;
      }

      const distanciaMaxima =
        elemento.scrollWidth - elemento.clientWidth;

      if (distanciaMaxima <= 0) {
        return;
      }

      const siguientePosicion =
        elemento.scrollLeft + elemento.clientWidth * 0.75;

      if (siguientePosicion >= distanciaMaxima - 5) {
        elemento.scrollTo({
          left: 0,
          behavior: 'smooth'
        });
      } else {
        elemento.scrollBy({
          left: elemento.clientWidth * 0.75,
          behavior: 'smooth'
        });
      }
    }, 3000);
  }

  pauseCarousel(): void {
    if (this.autoScrollInterval) {
      clearInterval(this.autoScrollInterval);
      this.autoScrollInterval = undefined;
    }

    if (this.resumeTimeout) {
      clearTimeout(this.resumeTimeout);
      this.resumeTimeout = undefined;
    }
  }

  resumeCarouselDelay(): void {
    if (this.resumeTimeout) {
      clearTimeout(this.resumeTimeout);
    }

    this.resumeTimeout = setTimeout(() => {
      this.resumeTimeout = undefined;
      this.startCarousel();
    }, 8000);
  }

  stopCarousel(): void {
    if (this.autoScrollInterval) {
      clearInterval(this.autoScrollInterval);
      this.autoScrollInterval = undefined;
    }

    if (this.resumeTimeout) {
      clearTimeout(this.resumeTimeout);
      this.resumeTimeout = undefined;
    }
  }

  ampliarImagen(imagen: string, nombre: string): void {
    this.imagenAmpliada = imagen;
    this.nombreImagenAmpliada = nombre;
  }

  cerrarImagen(): void {
    this.imagenAmpliada = null;
    this.nombreImagenAmpliada = '';
  }

  esFavorito(id: number): boolean {
    return this.favoritos.includes(id);
  }

  alternarFavorito(id: number): void {
    if (this.esFavorito(id)) {
      this.favoritos = this.favoritos.filter(
        favoritoId => favoritoId !== id
      );
    } else {
      this.favoritos = [...this.favoritos, id];
    }

    this.guardarFavoritos();
  }

  private cargarFavoritos(): void {
    try {
      const guardados = localStorage.getItem(this.claveFavoritos);

      if (guardados) {
        const datos: unknown = JSON.parse(guardados);

        if (
          Array.isArray(datos) &&
          datos.every(id => typeof id === 'number')
        ) {
          this.favoritos = datos;
        }
      }
    } catch {
      this.favoritos = [];
    }
  }

  private guardarFavoritos(): void {
    try {
      localStorage.setItem(
        this.claveFavoritos,
        JSON.stringify(this.favoritos)
      );
    } catch {
      console.warn('No fue posible guardar los favoritos.');
    }
  }

  irA(seccion: string): void {
    const rutas: Record<string, string> = {
      inicio: '/home',
      explorar: '/explore',
      favoritos: '/favorites',
      ayuda: '/info'
    };

    const ruta = rutas[seccion];

    if (ruta) {
      void this.router.navigateByUrl(ruta);
    }
  }
}