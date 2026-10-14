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
  @ViewChild('categoryCarousel') categoryCarousel?: ElementRef<HTMLDivElement>;

  // Búsqueda y categorías
  busqueda = '';
  categoriaSeleccionada = 'Todos';

  // Control de visibilidad de las flechas del carrusel
  puedeScrollIzq = false;
  puedeScrollDer = true;

  // Vista actual (Lista / Mapa)
  vistaActual: 'lista' | 'mapa' = 'lista';

  // Negocio enfocado en el mapa (null = muestra todos los lugares)
  negocioSeleccionadoMapa: Lugar | null = null;

  // Visor de imágenes
  imagenAmpliada: string | null = null;
  nombreImagenAmpliada = '';

  // Favoritos guardados en el dispositivo
  favoritos: number[] = [];
  private readonly claveFavoritos = 'tutour-favoritos';

  // Mapa
  mapaUrl!: SafeResourceUrl;

  public router = inject(Router);
  private sanitizer = inject(DomSanitizer);
  private route = inject(ActivatedRoute);

  // Soporte para arrastrar con mouse / touch
  private isDragging = false;
  private startX = 0;
  private scrollLeftStart = 0;

  // Categorías solicitadas
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

    // Inicia con el mapa general de Calvillo
    this.actualizarUrlMapaGeneral();
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

  // Navegación
  esRutaActiva(ruta: string): boolean {
    return this.router.url.includes(ruta);
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

  // Control de desplazamiento del carrusel
  onCarouselScroll(): void {
    this.actualizarEstadoFlechas();
  }

  actualizarEstadoFlechas(): void {
    const el = this.categoryCarousel?.nativeElement;
    if (!el) return;

    const scrollLeft = Math.ceil(el.scrollLeft);
    const maxScroll = el.scrollWidth - el.clientWidth;

    this.puedeScrollIzq = scrollLeft > 5;
    this.puedeScrollDer = scrollLeft < (maxScroll - 12);
  }

  desplazarCategorias(direccion: 'izq' | 'der'): void {
    const el = this.categoryCarousel?.nativeElement;
    if (!el) return;

    const delta = direccion === 'der' ? 150 : -150;

    if (typeof el.scrollBy === 'function') {
      el.scrollBy({ left: delta, behavior: 'smooth' });
    } else {
      el.scrollLeft += delta;
    }

    setTimeout(() => {
      this.actualizarEstadoFlechas();
    }, 300);
  }

  // Arrastre con mouse / touch
  iniciarArrastre(event: MouseEvent | TouchEvent): void {
    const el = this.categoryCarousel?.nativeElement;
    if (!el) return;

    this.isDragging = true;
    const pageX = 'touches' in event ? event.touches[0].pageX : event.pageX;
    this.startX = pageX - el.offsetLeft;
    this.scrollLeftStart = el.scrollLeft;
  }

  moverArrastre(event: MouseEvent | TouchEvent): void {
    if (!this.isDragging) return;

    const el = this.categoryCarousel?.nativeElement;
    if (!el) return;

    const pageX = 'touches' in event ? event.touches[0].pageX : event.pageX;
    const x = pageX - el.offsetLeft;
    const desplazamiento = (x - this.startX) * 1.5;
    el.scrollLeft = this.scrollLeftStart - desplazamiento;
    this.actualizarEstadoFlechas();
  }

  detenerArrastre(): void {
    this.isDragging = false;
  }

  // Filtros y Búsqueda
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

  // Al escribir en el buscador
  alBuscar(): void {
    this.negocioSeleccionadoMapa = null;
    this.actualizarUrlMapaGeneral();
  }

  // Al seleccionar categoría ("Todos", "Hospedaje", etc.)
  seleccionarCategoria(nombre: string): void {
    this.categoriaSeleccionada = nombre;
    this.negocioSeleccionadoMapa = null;
    this.actualizarUrlMapaGeneral();
  }

  // Vistas y Mapa
  cambiarVista(vista: 'lista' | 'mapa'): void {
    this.vistaActual = vista;
    if (vista === 'mapa' && !this.negocioSeleccionadoMapa) {
      this.actualizarUrlMapaGeneral();
    }
  }

  verEnMapa(place: Lugar, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.negocioSeleccionadoMapa = place;
    this.actualizarUrlMapa(place);
    this.vistaActual = 'mapa';
  }

  // Deseleccionar y regresar a la lista de todos los negocios en mapa
  deseleccionarNegocioMapa(): void {
    this.negocioSeleccionadoMapa = null;
    this.actualizarUrlMapaGeneral();
  }

  private actualizarUrlMapaGeneral(): void {
    const query = 'Calvillo, Aguascalientes, Mexico';
    this.mapaUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.google.com/maps?q=${encodeURIComponent(query)}&z=13&output=embed`
    );
  }

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

  // Favoritos
  esFavorito(id: number): boolean {
    return this.favoritos.includes(id);
  }

  alternarFavorito(id: number): void {
    if (this.esFavorito(id)) {
      this.favoritos = this.favoritos.filter((favoritoId) => favoritoId !== id);
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
        if (Array.isArray(datos) && datos.every((id) => typeof id === 'number')) {
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
}