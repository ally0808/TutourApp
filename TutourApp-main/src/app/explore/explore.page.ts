import {
  Component,
  inject,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { IonContent, IonIcon } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  star,
  heart,
  heartOutline,
  locationOutline,
  arrowBackOutline,
  chevronForwardOutline,
  chevronBackOutline,
  searchOutline,
  closeOutline,
  home,
  search,
  settingsOutline
} from 'ionicons/icons';
import { LUGARES, Lugar } from '../data/lugares.data';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, IonContent, IonIcon]
})
export class ExplorePage implements OnInit, AfterViewInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private sanitizer = inject(DomSanitizer);

  @ViewChild('categoryCarousel') categoryCarousel?: ElementRef<HTMLDivElement>;

  // Búsqueda y categorías
  busqueda = '';
  categoriaSeleccionada = 'Todos';

  // Objeto de categorías para la iteración del HTML (@for (cat of categories; track cat.name))
  categories = [
    { name: 'Todos', color: '#f39c12' },
    { name: 'Bares', color: '#FF0000'},
    { name: 'Restaurantes', color: '#FAA954' },
    { name: 'Desayunos', color: '#A8CF45'},
    { name: 'Artesanías', color: '#F06277'},
    { name: 'Hospedajes', color: '#5CC6D0' },
    { name: 'Cenadurías', color: '#CB7246'},
    { name: 'Sabores de mi Pueblo', color: '#FCD846'},
    { name: 'Lugares Recreativos', color: '#660066' }
  ];

  // Control de vista ('lista' | 'mapa')
  vistaActual: 'lista' | 'mapa' = 'lista';

  // Control de visibilidad de las flechas del carrusel
  puedeScrollIzq = false;
  puedeScrollDer = true;

  // Negocio seleccionado en el mapa
  negocioSeleccionadoMapa: Lugar | null = null;

  // URL segura para el iframe del mapa
  mapaUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59265.80800361286!2d-102.7533827!3d21.8466185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8429b634860b73cb%3A0x280be08e2b83eb1e!2sCalvillo%2C%20Ags.!5e0!3m2!1ses-419!2smx!4v1700000000000!5m2!1ses-419!2smx'
  );

  // Visualizador de imagen ampliada
  imagenAmpliada: string | null = null;
  nombreImagenAmpliada = '';

  // Lista de favoritos (IDs)
  favoritosIds: (number | string)[] = [];

  // Variables de control de arrastre del carrusel
  private isDragging = false;
  private startX = 0;
  private scrollLeftPos = 0;

  // Listas de datos
  todosLosLugares: Lugar[] = LUGARES;
  lugaresFiltrados: Lugar[] = LUGARES;

  constructor() {
    addIcons({
      star,
      heart,
      heartOutline,
      locationOutline,
      arrowBackOutline,
      chevronForwardOutline,
      chevronBackOutline,
      searchOutline,
      closeOutline,
      home,            
      search,          
      settingsOutline
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['cat']) {
        this.seleccionarCategoria(params['cat']);
      } else {
        this.filtrarLugares();
      }
    });
  }

  ngAfterViewInit(): void {
    this.verificarScroll();
  }

  // 🔍 Métodos de Búsqueda y Filtros
  alBuscar(): void {
    this.filtrarLugares();
  }

  seleccionarCategoria(catName: string): void {
    this.categoriaSeleccionada = catName;
    this.filtrarLugares();
  }

  filtrarLugares(): void {
    const texto = this.busqueda.toLowerCase().trim();
    const catSel = this.categoriaSeleccionada.toLowerCase().trim();

    this.lugaresFiltrados = this.todosLosLugares.filter(lugar => {
      const catLugar = lugar.category.toLowerCase().trim();

      let coincideCategoria = false;

      if (catSel === 'todos') {
        coincideCategoria = true;
      } else if (catSel === 'bares') {
        coincideCategoria = ['bares', 'bar', 'cantina', 'cantinas', 'bar / antro'].includes(catLugar);
      } else if (catSel === 'restaurantes' || catSel === 'restaurante' || catSel === 'gastronomía' || catSel === 'gastronomia') {
        coincideCategoria = ['restaurantes', 'restaurante', 'gastronomía', 'gastronomia', 'comida'].includes(catLugar);
      } else if (catSel === 'desayunos') {
        coincideCategoria = ['desayunos', 'desayuno', 'cafetería', 'cafeteria', 'café'].includes(catLugar);
      } else if (catSel === 'artesanías') {
        coincideCategoria = ['artesanías', 'artesanias', 'artesanía', 'artesania', 'artesano'].includes(catLugar);
      } else if (catSel === 'hospedajes') {
        coincideCategoria = ['hospedaje', 'hospedaje', 'alojamiento', 'alojamientos', 'hotel', 'hoteles', 'cabaña', 'cabañas', 'posada'].includes(catLugar);
      } else if (catSel === 'cenadurías') {
        coincideCategoria = ['cenadurías', 'cenadurias', 'cenaduría', 'cenaduria', 'cenador'].includes(catLugar);
      } else if (catSel === 'sabores de mi pueblo') {
        coincideCategoria = ['sabores de mi pueblo', 'sabores', 'gastronomía', 'gastronomia', 'tradicional', 'dulces'].includes(catLugar);
      } else if (catSel === 'lugares recreativos') {
        coincideCategoria = ['lugares recreativos', 'lugar recreativo', 'atractivos', 'atractivo', 'recreativo', 'parque', 'presa', 'balneario'].includes(catLugar);
      } else {
        // Fallback por si agregas otra categoría no listada
        coincideCategoria = catLugar === catSel || catLugar.includes(catSel) || catSel.includes(catLugar);
      }

      const coincideTexto =
        !texto ||
        lugar.name.toLowerCase().includes(texto) ||
        lugar.location.toLowerCase().includes(texto);

      return coincideCategoria && coincideTexto;
    });
  }

  // 🔀 Alternar entre Lista y Mapa
  cambiarVista(vista: 'lista' | 'mapa'): void {
    this.vistaActual = vista;
  }

  // 📍 Mapa / Negocio Seleccionado
  verEnMapa(place: Lugar): void {
    this.negocioSeleccionadoMapa = place;

    // 1. Si la empresa tiene su propia URL de mapa en la base de datos (ej. place.mapUrl)
    if ((place as any).mapUrl) {
      this.mapaUrl = this.sanitizer.bypassSecurityTrustResourceUrl((place as any).mapUrl);
    } else {
      // 2. Si no tiene URL guardada, genera un mapa de Google Maps con su nombre y dirección
      const busqueda = encodeURIComponent(`${place.name}, ${place.location || 'Calvillo, Ags.'}`);
      const embedUrl = `https://maps.google.com/maps?q=${busqueda}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
      
      this.mapaUrl = this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
    }

    // Cambia automáticamente a la pestaña de mapa
    this.cambiarVista('mapa');
  }

  deseleccionarNegocioMapa(): void {
    this.negocioSeleccionadoMapa = null;
    
    // Restablece el mapa al mapa general de Calvillo
    this.mapaUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59265.80800361286!2d-102.7533827!3d21.8466185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8429b634860b73cb%3A0x280be08e2b83eb1e!2sCalvillo%2C%20Ags.!5e0!3m2!1ses-419!2smx!4v1700000000000!5m2!1ses-419!2smx'
    );
  }

  // 🖼️ Ampliación de Imágenes
  ampliarImagen(url: string, nombre?: string): void {
    this.imagenAmpliada = url;
    this.nombreImagenAmpliada = nombre || '';
  }

  cerrarImagen(): void {
    this.imagenAmpliada = null;
    this.nombreImagenAmpliada = '';
  }

  // ❤️ Favoritos
  esFavorito(id: number | string): boolean {
    return this.favoritosIds.includes(id);
  }

  alternarFavorito(id: number | string): void {
    if (this.esFavorito(id)) {
      this.favoritosIds = this.favoritosIds.filter(favId => favId !== id);
    } else {
      this.favoritosIds.push(id);
    }
  }

  // 1. Cargar los IDs guardados al iniciar
  cargarFavoritos(): void {
    const favsGuardados = localStorage.getItem('favoritosIds');
    if (favsGuardados) {
      try {
        this.favoritosIds = JSON.parse(favsGuardados);
      } catch {
        this.favoritosIds = [];
      }
    }
  }
  

  // 🧭 Navegación
  esRutaActiva(ruta: string): boolean {
    return this.router.url === ruta;
  }

  irA(seccion: string): void {
    switch (seccion) {
      case 'inicio':
        void this.router.navigate(['/home']);
        break;
      case 'explorar':
        void this.router.navigate(['/explore']);
        break;
      case 'favoritos':
        void this.router.navigate(['/favorites']);
        break;
      case 'configuracion':
        void this.router.navigate(['/settings']);
        break;
    }
  }

  // ↔️ Carrusel de Categorías y Arrastre (Drag)
  verificarScroll(): void {
    if (!this.categoryCarousel?.nativeElement) return;
    const el = this.categoryCarousel.nativeElement;
    this.puedeScrollIzq = el.scrollLeft > 0;
    this.puedeScrollDer = el.scrollLeft + el.clientWidth < el.scrollWidth - 5;
  }

  onCarouselScroll(): void {
    this.verificarScroll();
  }

  desplazarCategorias(direccion: 'izq' | 'der'): void {
    if (!this.categoryCarousel?.nativeElement) return;
    const el = this.categoryCarousel.nativeElement;
    const desplazamiento = 160;

    el.scrollBy({
      left: direccion === 'der' ? desplazamiento : -desplazamiento,
      behavior: 'smooth'
    });

    setTimeout(() => this.verificarScroll(), 300);
  }

  iniciarArrastre(event: MouseEvent | TouchEvent): void {
    if (!this.categoryCarousel?.nativeElement) return;
    this.isDragging = true;
    const pageX = 'touches' in event ? event.touches[0].pageX : event.pageX;
    this.startX = pageX - this.categoryCarousel.nativeElement.offsetLeft;
    this.scrollLeftPos = this.categoryCarousel.nativeElement.scrollLeft;
  }

  moverArrastre(event: MouseEvent | TouchEvent): void {
    if (!this.isDragging || !this.categoryCarousel?.nativeElement) return;
    event.preventDefault();
    const pageX = 'touches' in event ? event.touches[0].pageX : event.pageX;
    const x = pageX - this.categoryCarousel.nativeElement.offsetLeft;
    const walk = (x - this.startX) * 1.5;
    this.categoryCarousel.nativeElement.scrollLeft = this.scrollLeftPos - walk;
  }

  detenerArrastre(): void {
    this.isDragging = false;
  }
}