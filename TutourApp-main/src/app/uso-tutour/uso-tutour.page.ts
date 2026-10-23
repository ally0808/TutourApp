import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLink } from '@angular/router';
import { IonContent, IonFooter, IonIcon } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  arrowBackOutline,
  searchOutline,
  compassOutline,
  locationOutline,
  heartOutline,
  informationOutline,
  home,
  search,
  settingsOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-uso-tutour',
  templateUrl: './uso-tutour.page.html',
  styleUrls: ['./uso-tutour.page.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, IonContent, IonFooter, IonIcon]
})
export class UsoTutourPage {
  constructor() {
    addIcons({
      arrowBackOutline,
      searchOutline,
      compassOutline,
      locationOutline,
      heartOutline,
      informationOutline,
      home,
      search,
      settingsOutline
    });
  }
}
