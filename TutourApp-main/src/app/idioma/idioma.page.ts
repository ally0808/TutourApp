import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IonContent, IonFooter, IonIcon } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  arrowBackOutline,
  globeOutline,
  informationCircleOutline,
  homeOutline, // 👈 Corregido: home -> homeOutline
  searchOutline,
  heartOutline,
  settingsOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-idioma',
  templateUrl: './idioma.page.html',
  styleUrls: ['./idioma.page.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, IonContent, IonFooter, IonIcon]
})
export class IdiomaPage {
  // Variable para saber qué idioma está activo (Español por defecto)
  idiomaSeleccionado: string = 'es';

  constructor() {
    addIcons({
      arrowBackOutline,
      globeOutline,
      informationCircleOutline,
      homeOutline,
      searchOutline,
      heartOutline,
      settingsOutline
    });
  }

  // Función para cambiar la selección del radio button al hacer clic
  seleccionarIdioma(codigo: string) {
    this.idiomaSeleccionado = codigo;
  }
}