import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonIcon, NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  arrowBackOutline,
  home,
  searchOutline,
  heartOutline,
  settingsOutline,
  locationSharp,
  closeOutline,
  expandOutline
} from 'ionicons/icons';
export interface ArticuloDetalle {
  id: string;
  categoria: string;
  titulo: string;
  subtitulo: string;
  estado: string;
  numeroArticulo: string;
  autor: string;
  fecha: string;
  imagenes: string[];
  descripcionGeneral: string[];
  destacadoTexto: string;
}

@Component({
  selector: 'app-detalle-articulo',
  templateUrl: './detalle-articulo.page.html',
  styleUrls: ['./detalle-articulo.page.scss'],
  standalone: true,
  imports: [IonContent, IonContent, CommonModule, IonContent, IonIcon]
})
export class DetalleArticuloPage implements OnInit {
  private navCtrl = inject(NavController);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  articulo?: ArticuloDetalle;
  imagenActivaIndex: number = 0;
  
  // ESTADO PARA MOSTRAR/OCULTAR LA IMAGEN EN PANTALLA COMPLETA
  mostrarModalImagen: boolean = false;

  private articulosBD: Record<string, ArticuloDetalle> = {
    'festival-taco': {
      id: 'festival-taco',
      categoria: 'Gastronomía',
      titulo: '¡Primer Festival del Taco y la Cerveza en Calvillo Pueblo Mágico!',
      subtitulo: 'Festival del Taco y la Cerveza',
      estado: 'Calvillo, Aguascalientes',
      numeroArticulo: 'Artículo 41',
      autor: 'La viajera soñadora',
      fecha: '04 de Abril 2022',
      imagenes: [
        '/assets/image/festival-taco.png',
        '/assets/image/festival-taco02.png',
        '/assets/image/festival-taco03.png'
      ],
      descripcionGeneral: [
        'Por primera vez en Calvillo Pueblo Mágico se llevó a cabo el Festival del Taco y la Cerveza con la participación de cerveceros artesanales de Calvillo y degustando los mejores tacos de este bello Pueblo Mágico.',
        'En el festival del taco y cerveza participaron varias taquerías con diversas propuestas, dentro de los participantes en el área de taco estuvieron: Taquería Tres Hermanos, La Boterita, Country Taco, Mc Toño, entre otros.'
      ],
      destacadoTexto: '¡Si te gustó este artículo no olvides compartirlo con tus familiares y amigos!'
    }
  };

  constructor() {
    addIcons({
      arrowBackOutline,
      home,
      searchOutline,
      heartOutline,
      settingsOutline,
      locationSharp,
      closeOutline,
      expandOutline
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && this.articulosBD[id]) {
      this.articulo = this.articulosBD[id];
    } else {
      this.articulo = this.articulosBD['festival-taco'];
    }
    this.imagenActivaIndex = 0;
  }

  seleccionarImagen(index: number): void {
    this.imagenActivaIndex = index;
  }

  // MÉTODOS DEL VISOR A PANTALLA COMPLETA
  abrirModalImagen(): void {
    this.mostrarModalImagen = true;
  }

  cerrarModalImagen(): void {
    this.mostrarModalImagen = false;
  }

  regresar(): void {
    this.navCtrl.back();
  }

  irANavegacion(ruta: string): void {
    void this.navCtrl.navigateForward(ruta);
  }

  esRutaActiva(ruta: string): boolean {
    return this.router.url === ruta;
  }

  onImgError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = 'https://placehold.co/800x500/1a1a24/ffffff?text=Imagen+No+Encontrada';
  }
}