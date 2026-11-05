import { Component, OnInit, OnDestroy, inject, ChangeDetectorRef} from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { IonContent, IonFooter, IonIcon } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { LUGARES, Lugar } from '../data/lugares.data';
import { FavoritosService } from '../services/favoritos.service';
import { TranslatePipe } from '@ngx-translate/core';
import {
  arrowBackOutline,
  heart,
  heartOutline,
  call,
  logoWhatsapp,
  globeOutline,
  shareSocial,
  star,
  locationSharp,
  cashOutline,
  timeOutline,
  checkmarkCircle,
  closeCircleOutline,
  logoFacebook,
  logoInstagram,
  home,
  searchOutline,
  settingsOutline,
  chevronBackOutline,
  chevronForwardOutline,
  navigateOutline,
  informationCircleOutline,
  restaurantOutline,
  sparklesOutline,
  mapOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-detalle-empresa',
  templateUrl: './detalle-empresa.page.html',
  styleUrls: ['./detalle-empresa.page.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, IonContent, IonFooter, IonIcon, TranslatePipe]
})
export class DetalleEmpresaPage implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private location = inject(Location);
  private sanitizer = inject(DomSanitizer);
  private favoritosService = inject(FavoritosService);
  private cdr = inject(ChangeDetectorRef);

  origen: 'inicio' | 'explorar' | 'favoritos' | 'configuracion' = 'inicio';
  seccionActiva: 'info' | 'oferta' | 'servicios' | 'ubicacion' = 'info';
  fotoActualIndex: number = 0;
  empresaActual: Lugar = LUGARES[0];

  // ⏱️ Temporizador para cambio automático de imágenes
  private timerCarrusel: any = null;

  constructor() {
    addIcons({
      arrowBackOutline,
      heart,
      heartOutline,
      call,
      logoWhatsapp,
      globeOutline,
      shareSocial,
      star,
      locationSharp,
      cashOutline,
      timeOutline,
      checkmarkCircle,
      closeCircleOutline,
      logoFacebook,
      logoInstagram,
      home,
      searchOutline,
      settingsOutline,
      chevronBackOutline,
      chevronForwardOutline,
      navigateOutline,
      informationCircleOutline,
      restaurantOutline,
      sparklesOutline,
      mapOutline
    });
  }

  ngOnInit(): void {
    const state = history.state as { origen?: 'inicio' | 'explorar' | 'favoritos' | 'configuracion' };
    if (state && state.origen) {
      this.origen = state.origen;
    }
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
     
      if (idParam) {
        const encontrada = LUGARES.find((p) => String(p.id) === String(idParam));
        if (encontrada) {
          this.empresaActual = encontrada;
        }
      }
      this.fotoActualIndex = 0;
      this.iniciarAutoSlide(); // Inicia el cambio automático al cargar datos
    });
  }

  // 🔄 Encender / Apagar cambio automático según la visibilidad de la pantalla
  ionViewWillEnter(): void {
    this.iniciarAutoSlide();
  }

  ionViewWillLeave(): void {
    this.detenerAutoSlide();
  }

  ngOnDestroy(): void {
    this.detenerAutoSlide();
  }

  // ⏱️ Métodos del carrusel automático (2 segundos)
  iniciarAutoSlide(): void {
    this.detenerAutoSlide();
    this.timerCarrusel = setInterval(() => {
      if (this.fotos.length > 1) {
        this.siguienteFoto();
      }
    }, 2000); // 2000 ms = 2 segundos
  }

  detenerAutoSlide(): void {
    if (this.timerCarrusel) {
      clearInterval(this.timerCarrusel);
      this.timerCarrusel = null;
    }
  }

  // 💡 Estado de favorito dinámico recuperado del servicio
  get esFavorito(): boolean {
    return this.favoritosService.esFavorito(Number(this.empresaActual?.id));
  }

  toggleFavorito(): void {
    if (this.empresaActual?.id) {
      this.favoritosService.alternar(Number(this.empresaActual.id));
    }
  }

  get mapUrl(): SafeResourceUrl {
    const nombre = this.empresaActual?.name || '';
    const direccion = this.empresaActual?.location || 'Calvillo, Ags';
    const busqueda = encodeURIComponent(`${nombre} ${direccion}`);
    const url = `https://www.google.com/maps?q=${busqueda}&output=embed`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  abrirGoogleMaps(): void {
    const direccion = this.empresaActual?.location || this.empresaActual?.name || 'Calvillo, Ags';
    const busqueda = encodeURIComponent(`${this.empresaActual?.name || ''}, ${direccion}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${busqueda}`, '_blank');
  }

  regresar(): void {
    this.location.back();
  }

  get fotos(): string[] {
    return this.empresaActual?.gallery && this.empresaActual.gallery.length > 0
      ? this.empresaActual.gallery
      : [this.empresaActual?.image || ''];
  }

  cambiarTab(tab: 'info' | 'oferta' | 'servicios' | 'ubicacion'): void {
    this.seccionActiva = tab;
  }

  siguienteFoto(): void {
    if (this.fotos.length > 0) {
      this.fotoActualIndex = (this.fotoActualIndex + 1) % this.fotos.length;
      this.cdr.detectChanges();
    }
  }

  anteriorFoto(): void {
    if (this.fotos.length > 0) {
      this.fotoActualIndex = (this.fotoActualIndex - 1 + this.fotos.length) % this.fotos.length;
      this.cdr.detectChanges();
    }
  }

  siguienteFotoManual(): void {
    this.siguienteFoto();
    this.iniciarAutoSlide(); // Reinicia la cuenta de 2 segundos desde cero
  }

  anteriorFotoManual(): void {
    this.anteriorFoto();
    this.iniciarAutoSlide(); // Reinicia la cuenta de 2 segundos desde cero
  }

  compartir(): void {
    if (navigator.share) {
      navigator.share({
        title: this.empresaActual?.name,
        text: `¡Mira ${this.empresaActual?.name} en Calvillo Pueblo Mágico!`,
        url: window.location.href,
      }).catch(() => {});
    }
  }

  imagenAmpliada: string | null = null;

ampliarImagen(url: string): void {
  this.imagenAmpliada = url;
}

cerrarImagen(): void {
  this.imagenAmpliada = null;
}
}