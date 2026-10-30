import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  inject
} from '@angular/core';

import { IonContent, IonIcon, NavController } from '@ionic/angular';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LUGARES } from '../data/lugares.data';
import { Router, RouterLink } from '@angular/router';
import { FavoritosService } from '../services/favoritos.service';
import { addIcons } from 'ionicons';
import {
  arrowBackOutline,
  searchOutline,
  search,
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
  bulbOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonContent, FormsModule, IonIcon, RouterLink]
})
export class HomePage implements AfterViewInit, OnDestroy {
  private location = inject(Location);
  busqueda = '';
  terminoBusqueda = '';
  private router = inject(Router);
  private navCtrl = inject(NavController);
  private favoritosService = inject(FavoritosService);

  @ViewChild('featuredScroll') featuredScroll?: ElementRef<HTMLDivElement>;

  private carouselInterval: ReturnType<typeof setInterval> | undefined;
  private initTimeout: ReturnType<typeof setTimeout> | undefined;

  // Control de arrastre para no bloquear el clic
  private isDragging = false;
  private fueArrastre = false;
  private startX = 0;
  private scrollLeft = 0;

  private touchStartX = 0;
  private touchEndX = 0;

  bannerPresionado: string | null = null;

  // 🎨 Vinculamos automáticamente con lugares.data.ts e incluimos el 'color'
  empresas = LUGARES.map((lugar) => ({
    id: lugar.id,
    nombre: lugar.name,
    categoria: lugar.category,
    calificacion: lugar.rating,
    direccion: lugar.location,
    imagen: lugar.image,
    color: lugar.color || '#ff9f43' 
  }));

  empresasCarrusel = [
    ...this.empresas,
    ...this.empresas,
    ...this.empresas
  ];

  constructor() {
    addIcons({
      arrowBackOutline,
      bulbOutline,
      searchOutline,
      search,
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
      star,
      location,
      home,
      compassOutline,
      settingsOutline,
      mapOutline,
      newspaperOutline,
      peopleOutline,
      chevronForwardOutline
    });
  }

  obtenerColorCategoria(categoria: string): string {
  if (!categoria) return '#ff9f43';
  const cat = categoria.toLowerCase().trim();

  if (cat.includes('hospedaje') || cat.includes('hotel')) return '#5CC6D0';
  if (cat.includes('restaurante') || cat.includes('gastronomía')) return '#FAA954';
  if (cat.includes('recreativo') || cat.includes('atractivo')) return '#660066';
  if (cat.includes('desayuno')) return '#A8CF45';
  if (cat.includes('cenaduría') || cat.includes('cenaduria')) return '#CB7246';
  if (cat.includes('sabor') || cat.includes('pueblo')) return '#FCD846';
  if (cat.includes('artesanía') || cat.includes('artesania')) return '#F06277';
  if (cat.includes('bar') || cat.includes('bares')) return '#FF0000';

  return '#ff9f43'; // Color por defecto si no encuentra coincidencia
  }

  // Método para limpiar la búsqueda y volver al inicio
  limpiarBusqueda(): void {
    this.terminoBusqueda = '';
    this.busqueda = '';
  }

  //Método para regresar a la página anterior
  regresar(): void {
    this.location.back();
  }

  // 3. MÉTODO PÚBLICO para el buscador (Sin 'private')
  aluscar(): void {
    if (this.busqueda.trim()) {
      void this.router.navigate(['/explore'], {
        queryParams: { q: this.busqueda }
      });
    }
  }

  ngAfterViewInit() {
    this.initTimeout = setTimeout(() => {
      const container = this.featuredScroll?.nativeElement;
      if (!container) return;

      const tarjeta = container.querySelector('.business-card') as HTMLElement;
      if (!tarjeta) return;

      const distancia = tarjeta.offsetWidth + 12;
      const anchoBloque = distancia * this.empresas.length;

      if (typeof container.scrollTo === 'function') {
        container.scrollTo({ left: anchoBloque, behavior: 'auto' });
      } else {
        container.scrollLeft = anchoBloque;
      }

      this.carouselInterval = setInterval(() => {
        this.moverCarrusel();
      }, 3000);
    });
  }

  ngOnDestroy() {
    if (this.initTimeout) clearTimeout(this.initTimeout);
    if (this.carouselInterval) clearInterval(this.carouselInterval);
  }

  // ==========================================
  // BÚSQUEDA
  // ==========================================
  onSearchInput(event: any): void {
    const valor = event.target?.value || event.detail?.value || '';
    this.terminoBusqueda = valor.toLowerCase().trim();
  }

  get empresasFiltradas() {
    if (!this.terminoBusqueda) return [];
    return this.empresas.filter(empresa =>
      empresa.nombre.toLowerCase().includes(this.terminoBusqueda) ||
      empresa.categoria.toLowerCase().includes(this.terminoBusqueda) ||
      empresa.direccion.toLowerCase().includes(this.terminoBusqueda)
    );
  }

  

  // ==========================================
  // NAVEGACIÓN Y NAVEGACIÓN A DETALLE
  // ==========================================
  
  verDetalle(id: number): void {
    if (this.fueArrastre) {
      this.fueArrastre = false;
      return;
    }
    void this.router.navigate(['/detalle-empresa'], { queryParams: { id } });
  }

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

  irANavegacion(ruta: string): void {
    if (ruta === '/home' || ruta === '/explore' || ruta === '/favorites') {
      void this.router.navigateByUrl(ruta);
    }
  }

  irACategoria(categoria: string): void {
    void this.router.navigate(['/explore'], { queryParams: { cat: categoria } });
  }

  irAGastronomia(): void {
    this.irACategoria('gastronomía');
  }
irAlojamientoAventuraCalvillo(): void {
    this.router.navigate(['/alojamiento-info']); 
  }


  irAtractivosTuristicos(): void {
    this.router.navigate(['/atractivos-info']); 
  }

  // ==========================================
  // FAVORITOS
  // ==========================================
  esFavorito(id: number): boolean {
    return this.favoritosService.esFavorito(id);
  }

  toggleFavorite(empresa: { id: number }): void {
    this.favoritosService.alternar(empresa.id);
  }

  // ==========================================
  // BANNERS Y ANIMACIONES
  // ==========================================
  presionarBanner(banner: string): void {
    this.bannerPresionado = banner;
  }

  soltarBanner(): void {
    this.bannerPresionado = null;
  }

  // ==========================================
  // CARRUSEL Y GESTOS TÁCTILES
  // ==========================================
  moverCarrusel(): void {
    const container = this.featuredScroll?.nativeElement;
    if (!container) return;

    const tarjeta = container.querySelector('.business-card') as HTMLElement;
    if (!tarjeta || this.empresas.length === 0) return;

    const distancia = tarjeta.offsetWidth + 12;
    const anchoBloque = distancia * this.empresas.length;

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

    if (typeof container.scrollBy === 'function') {
      container.scrollBy({ left: distancia, behavior: 'smooth' });
    } else {
      container.scrollLeft += distancia;
    }
  }

  iniciarArrastre(event: MouseEvent): void {
    this.fueArrastre = false;
    const container = this.featuredScroll?.nativeElement;
    if (!container) return;

    this.isDragging = true;
    this.startX = event.pageX - container.offsetLeft;
    this.scrollLeft = container.scrollLeft;
    container.classList.add('is-dragging');
  }

  moverArrastre(event: MouseEvent): void {
    if (!this.isDragging) return;

    const container = this.featuredScroll?.nativeElement;
    if (!container) return;

    const x = event.pageX - container.offsetLeft;
    const distancia = (x - this.startX) * 1.2;

    if (Math.abs(x - this.startX) > 5) {
      this.fueArrastre = true;
    }

    container.scrollLeft = this.scrollLeft - distancia;
  }

  terminarArrastre(): void {
    if (!this.isDragging) return;
    this.isDragging = false;

    if (this.featuredScroll?.nativeElement) {
      this.featuredScroll.nativeElement.classList.remove('is-dragging');
    }
  }

  irAPueblos(): void {
    void this.navCtrl.navigateForward('/explora-pueblos');
  }

  irABlog(): void {
    void this.navCtrl.navigateForward('/articulos-blog');
  }


  iniciarTouch(event: TouchEvent): void {
    this.fueArrastre = false;
    this.touchStartX = event.touches[0].clientX;
  }

  terminarTouch(event: TouchEvent): void {
    this.touchEndX = event.changedTouches[0].clientX;
    const diferencia = this.touchStartX - this.touchEndX;

    if (Math.abs(diferencia) > 10) {
      this.fueArrastre = true;
    }

    const container = this.featuredScroll?.nativeElement;
    if (!container || Math.abs(diferencia) < 30) return;

    const tarjeta = container.querySelector('.business-card') as HTMLElement;
    if (!tarjeta) return;

    const distancia = tarjeta.offsetWidth + 12;

    if (diferencia > 0) {
      if (typeof container.scrollBy === 'function') {
        container.scrollBy({ left: distancia, behavior: 'smooth' });
      } else {
        container.scrollLeft += distancia;
      }
    } else {
      if (typeof container.scrollBy === 'function') {
        container.scrollBy({ left: -distancia, behavior: 'smooth' });
      } else {
        container.scrollLeft -= distancia;
      }
    }
  }
}