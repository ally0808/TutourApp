import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLink } from '@angular/router';
import { IonContent, IonFooter, IonIcon } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  arrowBackOutline,
  mailOutline,
  callOutline,
  logoFacebook,
  logoInstagram,
  logoTiktok,
  home,
  searchOutline,
  heartOutline,
  settingsOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.page.html',
  styleUrls: ['./contacto.page.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, IonContent, IonFooter, IonIcon]
})
export class ContactoPage {
  constructor() {
    addIcons({
      arrowBackOutline,
      mailOutline,
      callOutline,
      logoFacebook,
      logoInstagram,
      logoTiktok,
      home,
      searchOutline,
      heartOutline,
      settingsOutline
    });
  }
}
