import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLink } from '@angular/router';
import { IonContent, IonFooter, IonIcon } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  arrowBackOutline,
  globeOutline,
  informationCircleOutline,
  home,
  searchOutline,
  heartOutline,
  settingsOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-idioma',
  templateUrl: './idioma.page.html',
  styleUrls: ['./idioma.page.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, IonContent, IonFooter, IonIcon]
})
export class IdiomaPage {
  constructor() {
    addIcons({
      arrowBackOutline,
      globeOutline,
      informationCircleOutline,
      home,
      searchOutline,
      heartOutline,
      settingsOutline
    });
  }
}
