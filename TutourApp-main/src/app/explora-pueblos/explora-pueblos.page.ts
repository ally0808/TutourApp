import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonIcon, NavController } from '@ionic/angular';
import { Router } from '@angular/router'; // 👈 Importación de Router
import { addIcons } from 'ionicons';
import {
  arrowBackOutline,
  home,
  searchOutline,
  heartOutline,
  settingsOutline
} from 'ionicons/icons';

export interface Pueblo {
  id: string;
  nombre: string;
  estado: string;
  descripcion: string;
  imagen: string;
}

@Component({
  selector: 'app-explora-pueblos',
  templateUrl: './explora-pueblos.page.html',
  styleUrls: ['./explora-pueblos.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonIcon]
})
export class ExploraPueblosPage {
  private navCtrl = inject(NavController);
  private router = inject(Router); // 👈 Inyección del servicio Router

  pueblos: Pueblo[] = [
    {
      id: 'calvillo',
      nombre: 'Calvillo',
      estado: 'AGUASCALIENTES',
      descripcion: 'Calvillo el pueblo mágico que huele a guayaba y magia por todos sus rincones.',
      imagen: 'assets/images/calvillo-pueblo.jpg'
    },
    {
      id: 'san-jose-de-gracia',
      nombre: 'San José de Gracia',
      estado: 'AGUASCALIENTES',
      descripcion: 'Es un pueblo mágico inmerso en la naturaleza, con una población que destaca por su calidez.',
      imagen: 'assets/images/san-jose-pueblo.jpg'
    }
  ];

  constructor() {
    addIcons({
      arrowBackOutline,
      home,
      searchOutline,
      heartOutline,
      settingsOutline
    });
  }

  regresar(): void {
    this.navCtrl.back();
  }

  irAHistoria(puebloId: string): void {
    void this.navCtrl.navigateForward(`/historia-pueblo/${puebloId}`);
  }

  irANavegacion(ruta: string): void {
    void this.navCtrl.navigateForward(ruta);
  }

  // 🎯 Evalúa si la pestaña actual coincide con la ruta dada
  esRutaActiva(ruta: string): boolean {
    return this.router.url === ruta;
  }

  onImgError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = 'https://via.placeholder.com/600x400/2a2a3b/ffffff?text=Pueblo+M%C3%A1gico';
  }

  onLogoError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = 'https://via.placeholder.com/100x100/F06277/ffffff?text=PM';
  }
}