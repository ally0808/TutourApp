import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnInit,
  inject
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  searchOutline,
  search,
  star,
  locationOutline,
  location,
  locationSharp,
  heart,
  heartOutline,
  chevronForwardOutline,
  chevronBackOutline,
  optionsOutline,
  home,
  settingsOutline
} from 'ionicons/icons';

import {
  DomSanitizer,
  SafeResourceUrl
} from '@angular/platform-browser';

interface Categoria {
  name: string;
  color: string;
}

export interface Lugar {
  id: number;
  name: string;
  category: string;
  color: string;
  rating: string;
  reviews: string;
  location: string;
  image: string;
  mapQuery?: string;
}

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonIcon
  ]
})
export class ExplorePage implements OnInit, AfterViewInit {

  @ViewChild('categoryCarousel')
  categoryCarousel?: ElementRef<HTMLDivElement>;

  // Búsqueda y categorías
  busqueda = '';
  categoriaSeleccionada = 'Todos';

  // Control de flechas del carrusel
  puedeScrollIzq = false;
  puedeScrollDer = true;

  // Vista actual (Lista / Mapa)
  vistaActual: 'lista' | 'mapa' = 'lista';

  // Negocio enfocado en el mapa
  negocioSeleccionadoMapa: Lugar | null = null;

  // Visor de imágenes
  imagenAmpliada: string | null = null;
  nombreImagenAmpliada = '';

  // Favoritos guardados en el dispositivo
  favoritos: number[] = [];
  private readonly claveFavoritos = 'tutour-favoritos';

  // Mapa
  mapaUrl!: SafeResourceUrl;

  private sanitizer = inject(DomSanitizer);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  // Categorías solicitadas por el usuario
  categories: Categoria[] = [
    { name: 'Todos', color: '#F7C93C' },
    { name: 'Hospedaje', color: '#4DBEC9' },
    { name: 'Restaurante', color: '#E06D44' },
    { name: 'Lugares recreativos', color: '#660066' },
    { name: 'Desayunos', color: '#9DC03E' },
    { name: 'Cenadurías', color: '#CB7246' },
    { name: 'Sabores de mi pueblo', color: '#FAA954' },
    { name: 'Artesanías', color: '#8F2368' },
    { name: 'Bares', color: '#E01E2E' },
  ];

  // Establecimientos correspondientes
  places: Lugar[] = [
    {
      id: 1,
      name: 'Cabañas Don Chava',
      category: 'Hospedaje',
      color: '#4DBEC9',
      rating: '4.9',
      reviews: '1200',
      location: 'Calle 5 de Mayo #104, Zona Centro.',
      mapQuery: 'Cabañas Don Chava, Calvillo',
      image: 'assets/images/cabanas-don-chava.png'
    },
    {
      id: 2,
      name: 'Grada Noventa y Seis',
      category: 'Bares',
      color: '#E01E2E',
      rating: '4.8',
      reviews: '500',
      location: 'Calle 5 de Mayo #104, Zona Centro.',
      mapQuery: 'Grada Noventa y Seis, Calvillo',
      image: 'assets/images/grada-noventa-y-seis.png'
    },
    {
      id: 3,
      name: 'Panadería Don Emiliano',
      category: 'Sabores de mi pueblo',
      color: '#FAA954',
      rating: '5.0',
      reviews: '3000',
      location: 'Calle 5 de Mayo #104, Zona Centro.',
      mapQuery: 'Panadería Don Emiliano, Calvillo',
      image: 'assets/images/panaderia-don-emiliano.png'
    },
    {
      id: 4,
      name: 'Restaurante Camino Viejo',
      category: 'Restaurante',
      color: '#E06D44',
      rating: '5.0',
      reviews: '250',
      location: 'Presa Malpaso, 20834 Ags., Mexico',
      mapQuery: 'Presa Malpaso, 20834 Ags., Mexico',
      image: 'assets/images/restaurante-camino-viejo.png'
    },
    {
      id: 5,
      name: 'Yolihuani Relax Resort',
      category: 'Hospedaje',
      color: '#4DBEC9',
      rating: '5.0',
      reviews: '180',
      location: 'Carretera La Panadera-Palo Alto km 14, Calvillo, México.',
      mapQuery: 'Yolihuani Relax Resort, Calvillo',
      image: 'assets/images/yolihuani-relax-resort.png'
    },
    {
      id: 6,
      name: 'Cenaduría Doña Lupe',
      category: 'Cenadurías',
      color: '#CB7246',
      rating: '4.9',
      reviews: '420',
      location: 'Calle 5 de Mayo #104, Zona Centro.',
      mapQuery: 'Calle 5 de Mayo, Calvillo, Aguascalientes',
      image: 'assets/images/panaderia-don-emiliano.png'
    },
    {
      id: 7,
      name: 'Parque La Cueva Aventura',
      category: 'Lugares recreativos',
      color: '#660066',
      rating: '4.8',
      reviews: '850',
      location: 'Carretera Calvillo-Jalpa Km 55, Calvillo, Ags.',
      mapQuery: 'La Cueva, Calvillo, Aguascalientes',
      image: 'assets/images/banner-alojamiento.jpg'
    },
    {
      id: 8,
      name: 'Desayunos El Rinconcito',
      category: 'Desayunos',
      color: '#9DC03E',
      rating: '4.9',
      reviews: '610',
      location: 'Calle 5 de Mayo #104, Zona Centro.',
      mapQuery: 'Calle 5 de Mayo, Calvillo',
      image: 'assets/images/banner-gastronomia.jpg'
    },
    {
      id: 9,
      name: 'Taller de Deshilado y Artesanías',
      category: 'Artesanías',
      color: '#8F2368',
      rating: '5.0',
      reviews: '980',
      location: 'Calle 5 de Mayo #104, Zona Centro.',
      mapQuery: 'Artesanias Calvillo, Aguascalientes',
      image: 'assets/images/calvillo-iglesia.png'
    }
  ];

  constructor() {
    addIcons({
      searchOutline,
      search,
      star,
      locationOutline,
      location,
      locationSharp,
      heart,
      heartOutline,
      chevronForwardOutline,
      chevronBackOutline,
      optionsOutline,
      home,
      settingsOutline
    });

    if (this.places.length > 0) {
      this.negocioSeleccionadoMapa = this.places[0];
      this.actualizarUrlMapa(this.negocioSeleccionadoMapa);
    }
  }

  ngOnInit(): void {
    this.cargarFavoritos();
    this.route.queryParamMap.subscribe((params) => {
      const cat = params.get('cat');
      if (cat) {
        this.seleccionarCategoria(cat);
      }
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.actualizarEstadoFlechas();
    }, 200);
  }

  // Soporte para arrastrar con mouse / touch
  private isDragging = false;
  private startX = 0;
  private scrollLeftStart = 0;

  get lugaresFiltrados(): Lugar[] {
    const texto = this.normalizar(this.busqueda);
    const palabras = texto.split(/\s+/).filter((p) => p.length > 0);

    return this.places.filter((place) => {
      const coincideCategoria =
        this.categoriaSeleccionada === 'Todos' ||
        this.normalizar(place.category) === this.normalizar(this.categoriaSeleccionada);

      if (!coincideCategoria) {
        return false;
      }

      if (palabras.length === 0) {
        return true;
      }

      const contenido = this.normalizar(
        `${place.name} ${place.category} ${place.location} ${place.mapQuery || ''}`
      );

      return palabras.every((palabra) => contenido.includes(palabra));
    });
  }

  private normalizar(texto: string): string {
    return texto
      .toLocaleLowerCase('es-MX')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  }

  // Al escribir en el buscador: actualiza resultados y enfoca el negocio en el mapa
  alBuscar(): void {
    const texto = this.normalizar(this.busqueda);

    if (texto.length === 0) {
      const disponibles = this.lugaresFiltrados;
      this.negocioSeleccionadoMapa =
        disponibles.length > 0 ? disponibles[0] : (this.places[0] || null);
      if (this.negocioSeleccionadoMapa) {
        this.actualizarUrlMapa(this.negocioSeleccionadoMapa);
      }
      return;
    }

    const encontrados = this.lugaresFiltrados;
    if (encontrados.length > 0) {
      this.negocioSeleccionadoMapa = encontrados[0];
      this.actualizarUrlMapa(this.negocioSeleccionadoMapa);
      return;
    }

    // Si no se encontró en la categoría actual, buscar en todos los lugares
    const enTodos = this.places.filter((p) => {
      const contenido = this.normalizar(
        `${p.name} ${p.category} ${p.location} ${p.mapQuery || ''}`
      );
      return contenido.includes(texto);
    });

    if (enTodos.length > 0) {
      this.categoriaSeleccionada = 'Todos';
      this.negocioSeleccionadoMapa = enTodos[0];
      this.actualizarUrlMapa(this.negocioSeleccionadoMapa);
    } else {
      this.negocioSeleccionadoMapa = null;
    }
  }

  // Al seleccionar categoría
  seleccionarCategoria(nombre: string): void {
    this.categoriaSeleccionada = nombre;
    const encontrados = this.lugaresFiltrados;
    if (encontrados.length > 0) {
      this.negocioSeleccionadoMapa = encontrados[0];
      this.actualizarUrlMapa(this.negocioSeleccionadoMapa);
    } else {
      this.negocioSeleccionadoMapa = null;
    }
  }

  // Desplazar el carrusel de categorías hacia izquierda o derecha
  desplazarCategorias(direccion: 'izq' | 'der'): void {
    const el = this.categoryCarousel?.nativeElement;
    if (!el) {
      return;
    }

    const delta = direccion === 'der' ? 140 : -140;

    if (typeof el.scrollBy === 'function') {
      el.scrollBy({ left: delta, behavior: 'smooth' });
    } else {
      el.scrollLeft += delta;
    }

    setTimeout(() => {
      this.actualizarEstadoFlechas();
    }, 300);
  }

  onCarouselScroll(): void {
    this.actualizarEstadoFlechas();
  }

  actualizarEstadoFlechas(): void {
    const el = this.categoryCarousel?.nativeElement;
    if (!el) {
      return;
    }

    this.puedeScrollIzq = el.scrollLeft > 10;
    this.puedeScrollDer = el.scrollLeft < (el.scrollWidth - el.clientWidth - 10);
  }

  // Soporte táctil y de arrastre con mouse para el carrusel
  iniciarArrastre(event: MouseEvent | TouchEvent): void {
    const el = this.categoryCarousel?.nativeElement;
    if (!el) {
      return;
    }
    this.isDragging = true;
    const pageX = 'touches' in event ? event.touches[0].pageX : event.pageX;
    this.startX = pageX - el.offsetLeft;
    this.scrollLeftStart = el.scrollLeft;
  }

  moverArrastre(event: MouseEvent | TouchEvent): void {
    if (!this.isDragging) {
      return;
    }
    const el = this.categoryCarousel?.nativeElement;
    if (!el) {
      return;
    }
    const pageX = 'touches' in event ? event.touches[0].pageX : event.pageX;
    const x = pageX - el.offsetLeft;
    const desplazamiento = (x - this.startX) * 1.5;
    el.scrollLeft = this.scrollLeftStart - desplazamiento;
    this.actualizarEstadoFlechas();
  }

  detenerArrastre(): void {
    this.isDragging = false;
  }

  // Cambiar entre vista de lista y vista de mapa
  cambiarVista(vista: 'lista' | 'mapa'): void {
    this.vistaActual = vista;
    if (vista === 'mapa') {
      const encontrados = this.lugaresFiltrados;
      if (!this.negocioSeleccionadoMapa && encontrados.length > 0) {
        this.negocioSeleccionadoMapa = encontrados[0];
      }
      if (this.negocioSeleccionadoMapa) {
        this.actualizarUrlMapa(this.negocioSeleccionadoMapa);
      }
    }
  }

  // Seleccionar un negocio para ver en mapa
  verEnMapa(place: Lugar, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.negocioSeleccionadoMapa = place;
    this.actualizarUrlMapa(place);
    this.vistaActual = 'mapa';
  }

  // Actualizar la URL de Google Maps para el negocio seleccionado
  private actualizarUrlMapa(lugar: Lugar): void {
    const query = lugar.mapQuery || `${lugar.name}, ${lugar.location}`;
    this.mapaUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.google.com/maps?q=${encodeURIComponent(query)}&z=15&output=embed`
    );
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
      this.favoritos = this.favoritos.filter(favoritoId => favoritoId !== id);
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
        if (Array.isArray(datos) && datos.every(id => typeof id === 'number')) {
          this.favoritos = datos;
        }
      }
    } catch {
      this.favoritos = [];
    }
  }

  private guardarFavoritos(): void {
    try {
      localStorage.setItem(this.claveFavoritos, JSON.stringify(this.favoritos));
    } catch {
      console.warn('No fue posible guardar los favoritos.');
    }
  }

  irA(seccion: string): void {
    const rutas: Record<string, string> = {
      inicio: '/home',
      explorar: '/explore',
      favoritos: '/home',
      configuracion: '/home'
    };

    const ruta = rutas[seccion];
    if (ruta) {
      void this.router.navigateByUrl(ruta);
    }
  }
}