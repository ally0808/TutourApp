import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLink } from '@angular/router';
import { IonContent, IonFooter, IonIcon } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  arrowBackOutline,
  shieldCheckmarkOutline,
  locationOutline,
  heartOutline,
  mapOutline,
  informationCircleOutline,
  chevronForwardOutline,
  home,
  searchOutline,
  settingsOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-privacidad',
  templateUrl: './privacidad.page.html',
  styleUrls: ['./privacidad.page.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, IonContent, IonFooter, IonIcon]
})
export class PrivacidadPage {
  constructor() {
    addIcons({
      arrowBackOutline,
      shieldCheckmarkOutline,
      locationOutline,
      heartOutline,
      mapOutline,
      informationCircleOutline,
      chevronForwardOutline,
      home,
      searchOutline,
      settingsOutline
    });
  }
}
