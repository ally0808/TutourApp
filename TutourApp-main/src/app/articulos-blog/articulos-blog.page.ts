import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonIcon, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  arrowBackOutline,
  home,
  searchOutline,
  heartOutline,
  settingsOutline
} from 'ionicons/icons';

export interface Articulo {
  id: string;
  titulo: string;
  numeroArticulo: string;
  autor: string;
  descripcion: string;
  imagen: string;
}

@Component({
  selector: 'app-articulos-blog',
  templateUrl: './articulos-blog.page.html',
  styleUrls: ['./articulos-blog.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonIcon]
})
export class ArticulosBlogPage {
  private navCtrl = inject(NavController);
  private router = inject(Router);

  articulos: Articulo[] = [
    {
      id: 'dulces-guayaba',
      titulo: '¡Dulces finos de guayaba! Frutland - Calvillo Pueblo Mágico',
      numeroArticulo: 'Artículo 27',
      autor: 'La viajera soñadora',
      descripcion: 'Somos una empresa dedicada a la elaboración y comercialización de dulces finos y diferenciados a base de la fruta de la región en Calvillo.',
      imagen: 'assets/images/blog/dulces-guayaba.jpg'
    },
    {
      id: 'festival-taco',
      titulo: '¡Primer Festival del Taco y la Cerveza en Calvillo Pueblo Mágico!',
      numeroArticulo: 'Artículo 41',
      autor: 'La viajera soñadora',
      descripcion: 'Por primera vez en Calvillo Pueblo Mágico se llevó a cabo el Festival del Taco y la Cerveza con la participación de cerveceros artesanales.',
      imagen: 'assets/images/festival-taco0.png'
    },
    {
      id: 'presa-calles',
      titulo: '¡La cortina de Aguascalientes que es más alta que 20 elefantes africanos! - La Presa Calles',
      numeroArticulo: 'Artículo 9',
      autor: 'El Turiviajero',
      descripcion: 'Si de presas enormes vamos a hablar, pues entonces de la Presa Plutarco Elías Calles te voy a charlar, y cada presa colosal lleva consigo una cortina...',
      imagen: 'assets/images/blog/presa-calles.jpg'
    },
    {
      id: 'calvillo-nubes',
      titulo: 'Festival Calvillo en las Nubes 2022',
      numeroArticulo: 'Artículo 47',
      autor: 'La viajera soñadora',
      descripcion: 'Este 5 y 6 de noviembre se realizó la segunda edición del Festival Calvillo en las Nubes que encabeza Daniel Romo Urrutia...',
      imagen: 'assets/images/blog/calvillo-nubes.jpg'
    },
    {
      id: 'invasion-jeepera',
      titulo: 'Invasión Jeepera en Calvillo',
      numeroArticulo: 'Artículo 44',
      autor: 'La viajera soñadora',
      descripcion: 'Por primera vez llegó al Pueblo Mágico de Calvillo un evento que se llenó de diversión y mucha adrenalina Invasión Jeepera 2022...',
      imagen: 'assets/images/blog/invasion-jeepera.jpg'
    },
    {
      id: 'santa-cruz',
      titulo: 'Inauguración de la Santa Cruz en Calvillo',
      numeroArticulo: 'Artículo 39',
      autor: 'La viajera soñadora',
      descripcion: 'Engalanados con la presencia del gobernador de Aguascalientes Martín Orozco Sandoval, se llevó a cabo el corte de listón...',
      imagen: 'assets/images/blog/santa-cruz.jpg'
    },
    {
      id: 'munpuma',
      titulo: '121 historias en un museo - Munpuma - Calvillo pueblo mágico',
      numeroArticulo: 'Artículo 12',
      autor: 'Aarón Esqueda',
      descripcion: 'En el centro de México, al occidente del estado de Aguascalientes, en el Valle del Huejúcar formado por las majestuosas sierras...',
      imagen: 'assets/images/blog/munpuma.jpg'
    },
    {
      id: 'el-bote',
      titulo: '"El bote" platillo más típico y auténtico de Mazamitla Pueblo Mágico',
      numeroArticulo: 'Artículo 16',
      autor: 'El Turiviajero',
      descripcion: 'Damos gracias a Dios y al universo por darnos el gusto de gozar todos los sabores y olores que nos regala cada guisado y platillo...',
      imagen: 'assets/images/blog/el-bote.jpg'
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

  irADetalle(articuloId: string): void {
    void this.navCtrl.navigateForward(`/detalle-articulo/${articuloId}`);
  }

  irANavegacion(ruta: string): void {
    void this.navCtrl.navigateForward(ruta);
  }

  esRutaActiva(ruta: string): boolean {
    return this.router.url === ruta;
  }

  onImgError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = 'https://via.placeholder.com/600x400/2a2a3b/ffffff?text=Art%C3%ADculo+Blog';
  }
}