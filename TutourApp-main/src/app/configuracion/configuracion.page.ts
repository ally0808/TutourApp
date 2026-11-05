import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IonContent, IonFooter, IonIcon } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { TranslatePipe } from '@ngx-translate/core';
import {
  arrowBackOutline,
  helpOutline,
  informationOutline,
  globeOutline,
  lockClosedOutline,
  callOutline,
  chevronForwardOutline,
  home,
  searchOutline,
  heartOutline,
  settingsOutline,
  homeOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, IonContent, IonFooter, IonIcon, TranslatePipe]
})
export class ConfiguracionPage {
  constructor() {
    addIcons({
      homeOutline,
      searchOutline,
      heartOutline,
      settingsOutline,
      arrowBackOutline,
      helpOutline,
      informationOutline,
      globeOutline,
      lockClosedOutline,
      callOutline,
      chevronForwardOutline,
      home,
    });
  }
}
