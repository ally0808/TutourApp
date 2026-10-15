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

import { LUGARES, Lugar } from '../data/lugares.data';
import { FavoritosService } from '../services/favoritos.service';

export type { Lugar } from '../data/lugares.data';

interface Categoria {
  name: string;
  color: string;
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

  // Mapa
  mapaUrl!: SafeResourceUrl;

  public router = inject(Router);
  private sanitizer = inject(DomSanitizer);
  private route = inject(ActivatedRoute);
  private favoritosService = inject(FavoritosService);

  // Favoritos guardados en el dispositivo (compartidos con la vista Favoritos)
  get favoritos(): number[] {
    return this.favoritosService.favoritosIds();
  }

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

  // Establecimientos correspondientes (catálogo compartido)
  places: Lugar[] = LUGARES;

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
    this.route.queryParamMap.subscribe((params) => {
      const cat = params.get('cat');
      if (cat) {
        this.seleccionarCategoria(cat);
      }

      // Abrir un lugar específico (por ejemplo, desde Favoritos)
      const lugarId = Number(params.get('lugar'));
      if (lugarId) {
        const lugar = this.places.find((p) => p.id === lugarId);
        if (lugar) {
          this.categoriaSeleccionada = 'Todos';
          this.busqueda = '';
          this.verEnMapa(lugar);
        }
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
      favoritos: '/favorites',
      configuracion: '/configuracion'
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
    return this.favoritosService.esFavorito(id);
  }

  alternarFavorito(id: number): void {
    this.favoritosService.alternar(id);
  }
}
