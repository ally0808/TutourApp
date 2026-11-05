import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLink } from '@angular/router';
import { IonContent, IonFooter, IonIcon } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  arrowBackOutline,
  checkmarkCircleOutline,
  eyeOutline,
  home,
  searchOutline,
  heartOutline,
  settingsOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-sobre-nosotros',
  templateUrl: './sobre-nosotros.page.html',
  styleUrls: ['./sobre-nosotros.page.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, IonContent, IonFooter, IonIcon]
})
export class SobreNosotrosPage {
  constructor() {
    addIcons({
      arrowBackOutline,
      checkmarkCircleOutline,
      eyeOutline,
      home,
      searchOutline,
      heartOutline,
      settingsOutline
    });
  }
}
