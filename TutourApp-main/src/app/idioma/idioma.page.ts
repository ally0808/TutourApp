import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IonContent, IonFooter, IonIcon } from '@ionic/angular';
import { TranslatePipe } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import {
  arrowBackOutline,
  globeOutline,
  informationCircleOutline,
  homeOutline,
  searchOutline,
  heartOutline,
  settingsOutline
} from 'ionicons/icons';

import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-idioma',
  templateUrl: './idioma.page.html',
  styleUrls: ['./idioma.page.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, IonContent, IonFooter, IonIcon, TranslatePipe]
})
export class IdiomaPage implements OnInit {
  private languageService = inject(LanguageService);
  private location = inject(Location);

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

  ngOnInit(): void {
    this.idiomaSeleccionado = this.languageService.getCurrentLanguage();
  }

  seleccionarIdioma(codigo: string): void {
    this.idiomaSeleccionado = codigo;
    this.languageService.setLanguage(codigo);
  }

  regresar(): void {
    this.location.back();
  }
}