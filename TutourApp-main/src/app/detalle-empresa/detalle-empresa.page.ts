import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
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

  seccionActiva: string = 'info';
  esFavorito: boolean = false;
  fotoActualIndex: number = 0;

  empresaActual!: Lugar;

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
      
      // Carga la empresa presionada o la primera como respaldo
      this.empresaActual = encontrada || LUGARES[0];
      this.fotoActualIndex = 0;
    });
  }

  get fotos(): string[] {
    return this.empresaActual.gallery && this.empresaActual.gallery.length > 0
      ? this.empresaActual.gallery
      : [this.empresaActual.image];
  }

  cambiarTab(tab: string) {
    this.seccionActiva = tab;
  }

  toggleFavorito() {
    this.esFavorito = !this.esFavorito;
  }

  siguienteFoto() {
    if (this.fotoActualIndex < this.fotos.length - 1) {
      this.fotoActualIndex++;
    } else {
      this.fotoActualIndex = 0;
    }
  }

  anteriorFoto() {
    if (this.fotoActualIndex > 0) {
      this.fotoActualIndex--;
    } else {
      this.fotoActualIndex = this.fotos.length - 1;
    }
  }

  compartir() {
    if (navigator.share) {
      navigator.share({
        title: this.empresaActual.name,
        text: `¡Mira ${this.empresaActual.name} en Calvillo Pueblo Mágico!`,
        url: window.location.href,
      }).catch(() => {});
    }
  }
}