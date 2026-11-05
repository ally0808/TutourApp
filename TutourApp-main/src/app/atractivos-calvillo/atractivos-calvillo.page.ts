import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { IonContent, IonIcon, NavController} from '@ionic/angular';
import { addIcons }  from 'ionicons';
import {
  arrowBackOutline,
  home,
  search,
  heartOutline,
  settingsOutline
} from 'ionicons/icons'

interface AtractivoItem {
  id: string;
  subtitulo?: string;
  titulo: string;
  imagen: string;
  ruta: string;
  esDestacado?: boolean; // Para el 5to botón con el distintivo naranja
}

@Component({
  selector: 'app-atractivos-calvillo',
  templateUrl: './atractivos-calvillo.page.html',
  styleUrls: ['./atractivos-calvillo.page.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, IonContent, IonIcon]
})
export class AtractivosCalvilloPage {
  private NavCtrl = inject(NavController);
  private router = inject(Router);
  private location = inject(Location);

  // Lista de los 5 botones/atractivos
  atractivos: AtractivoItem[] = [
    {
      id: 'santa-cruz',
      subtitulo: 'Explora la magia de...',
      titulo: 'Santa Cruz de Calvillo',
      imagen: 'assets/images/santa-cruz.jpg', // Replace with your image
      ruta: '/atractivo-santa-cruz'
    },
    {
      id: 'presa-malpaso',
      subtitulo: 'Explora la magia de...',
      titulo: 'Presa de Malpaso',
      imagen: 'assets/images/presa-malpaso.jpg', // Replace with your image
      ruta: '/presa-malpaso'
    },
    {
      id: 'las-graditas',
      subtitulo: 'Explora la magia de...',
      titulo: 'Las Graditas',
      imagen: 'assets/images/las-graditas.jpg', // Replace with your image
      ruta: '/las-graditas'
    },
    {
      id: 'santuario-guadalupe',
      subtitulo: 'Explora la magia de...',
      titulo: 'Santuario de la Virgen de Guadalupe',
      imagen: 'assets/images/santuario-guadalupe.jpg', // Replace with your image
      ruta: '/atractivo-santuario'
    },
    {
      id: 'plaza-principal-calvillo',
      subtitulo: 'Explora la magia de...',
      titulo: 'Descubre más lugares mágicos',
      imagen: 'assets/images/plaza-de-calvillo.jpg', // Replace with your image
      ruta: '/atractivo-plaza-de-calvillo'
    },
    {
      id: 'casa-del-artesano',
      subtitulo: 'Explora la magia de...',
      titulo: 'Casa del Artesano',
      imagen: 'assets/images/casa-del-artesano.jpg', // Replace with your image
      ruta: '/atractivo-casa-del-artesano'
    },
    {
      id: 'museo-nacional-de-calvillo',
      subtitulo: 'Explora la magia de...',
      titulo: 'MUNPUMA',
      imagen: 'assets/images/museo-calvillo.jpg', // Replace with your image
      ruta: '/atractivo-museo-nacional-de-calvillo'
    },
    {
      id: 'cordoniz-presa',
      subtitulo: 'Explora la magia de...',
      titulo: 'Presa de la Cordorniz',
      imagen: 'assets/images/codorniz-presa.jpg', // Replace with your image
      ruta: '/atractivo-presa-codorniz'
    },
    {
      id: 'sierra-del-laurel',
      subtitulo: 'Explora la magia de...',
      titulo: 'Sierra del Laurel',
      imagen: 'assets/images/sierra-del-laurel.jpg', // Replace with your image
      ruta: '/atractivo-sierra-del-laurel'
    },
    {
      id: 'cascada-del-garruño',
      subtitulo: 'Explora la magia de...',
      titulo: 'Cascada del Garruño',
      imagen: 'assets/images/garruño-cascada.jpg', // Replace with your image
      ruta: '/cascada-del-garruño'
    },
    {
      id: 'parroquia-señor-del-salitre',
      subtitulo: 'Explora la magia de...',
      titulo: 'Parroquia del Señor del Salitre',
      imagen: 'assets/images/parroquia-salitre.jpg', // Replace with your image
      ruta: '/parroquia-señor-del-salitre'
    },
    {
      id: 'el-huarache',
      subtitulo: 'Explora la magia de...',
      titulo: 'El Huarache',
      imagen: 'assets/images/el-huarache.jpg', // Replace with your image
      ruta: '/el-huarache'
    },
    {
      id: 'los-chamucos',
      subtitulo: 'Explora la magia de...',
      titulo: 'Los Chamuchos',
      imagen: 'assets/images/los-chamucos.jpg', // Replace with your image
      ruta: '/los-chamucos'
    },
    {
      id: 'cerro del blanco cascada',
      subtitulo: 'Explora la magia de...',
      titulo: 'Cascada del Cerro blanco',
      imagen: 'assets/images/cerro-blanco-cascada.jpg', // Replace with your image
      ruta: '/cerro del blanco cascada'
    },
    {
    id: 'cruz-de-los-cristeros',
      subtitulo: 'Explora la magia de...',
      titulo: 'La Cruz de Los Cristeros',
      imagen: 'assets/images/cruz-de-los-cristeros.jpg', // Replace with your image
      ruta: '/cruz-de-los-cristeros'
    },
    {
      id: 'cascada de los huechos',
      subtitulo: 'Explora la magia de...',
      titulo: 'Cascada de los Huechos',
      imagen: 'assets/images/huechos-cascada.jpg', // Replace with your image
      ruta: '/cascada-de-los-huenchos'
    }  
  ];

  constructor(){
    addIcons({
      arrowBackOutline,
      home,
      search,
      heartOutline,
      settingsOutline
    });
  }
  
  regresar(): void {
    // Intenta regresar en la pila de historial de Ionic
    this.NavCtrl.back();
  }


  irADetalle(ruta: string): void {
    this.router.navigateByUrl(ruta);
  }
  // --- LÓGICA DE NAVEGACIÓN INFERIOR ---
  esRutaActiva(ruta: string): boolean {
    if (ruta === '/home') {
      return this.router.url === '/home' || this.router.url.includes('calvillo');
    }
    return this.router.url === ruta;
  }

  irA(seccion: string): void {
    const rutas: Record<string, string> = {
      inicio: '/home',
      explorar: '/explore',
      favoritos: '/favorites',
      configuracion: '/configuracion'
    };
    if (rutas[seccion]) {
      this.router.navigateByUrl(rutas[seccion]);
    }
  }
}
