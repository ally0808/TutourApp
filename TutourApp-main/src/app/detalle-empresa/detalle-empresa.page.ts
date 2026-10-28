import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { IonContent, IonFooter, IonIcon } from '@ionic/angular';
import { addIcons } from 'ionicons';

import { LUGARES, Lugar } from '../data/lugares.data';

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
  imports: [CommonModule, RouterLink, IonContent, IonFooter, IonIcon]
})
export class DetalleEmpresaPage implements OnInit {
  private route = inject(ActivatedRoute);
  private location = inject(Location);
  private sanitizer = inject(DomSanitizer);

  // Tipado estricto para evitar errores en las comparaciones de la plantilla
  seccionActiva: 'info' | 'oferta' | 'servicios' | 'ubicacion' = 'info';
  esFavorito: boolean = false;
  fotoActualIndex: number = 0;
  empresaActual: Lugar = LUGARES[0];

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
    this.route.queryParamMap.subscribe((params) => {
      const id = Number(params.get('id'));
      const encontrada = LUGARES.find((p) => p.id === id);
      if (encontrada) {
        this.empresaActual = encontrada;
      }
      this.fotoActualIndex = 0;
    });
  }

  get mapUrl(): SafeResourceUrl {
  const nombre = this.empresaActual?.name || '';
  const direccion = this.empresaActual?.location || 'Calvillo, Ags';
  const busqueda = encodeURIComponent(`${nombre} ${direccion}`);
  // URL limpia compatible con iframe
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

  toggleFavorito(): void {
    this.esFavorito = !this.esFavorito;
  }

  siguienteFoto(): void {
    if (this.fotos.length > 0) {
      this.fotoActualIndex = (this.fotoActualIndex + 1) % this.fotos.length;
    }
  }

  anteriorFoto(): void {
    if (this.fotos.length > 0) {
      this.fotoActualIndex = (this.fotoActualIndex - 1 + this.fotos.length) % this.fotos.length;
    }
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
}