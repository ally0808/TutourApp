import { Component, inject, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonIcon, NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  arrowBackOutline,
  busOutline,
  airplaneOutline,
  mapOutline,
  cashOutline,
  timeOutline,
  home,
  searchOutline,
  heartOutline,
  settingsOutline
} from 'ionicons/icons';

export interface RutaTranvia {
  id: string;
  nombre: string;
  descripcion: string;
  costoAdultos: string;
  costoNinos: string;
  horario: string;
  imagen: string;
}

export interface DetallePueblo {
  id: string;
  nombre: string;
  subtitulo: string;
  carruselImagenes: string[];
  historiaPart1: string[];
  imagenViejita: string;
  pieImagenViejita: string;
  historiaPart2: string;
  comoLlegar: {
    autobus: string;
    avion: string;
  };
  rutasTranvia: RutaTranvia[];
}

@Component({
  selector: 'app-historia-pueblo',
  templateUrl: './historia-pueblo.page.html',
  styleUrls: ['./historia-pueblo.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonIcon]
})
export class HistoriaPuebloPage implements OnInit, OnDestroy {
  @ViewChild('carouselContainer') carouselRef!: ElementRef<HTMLDivElement>;

  private navCtrl = inject(NavController);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  pueblo: DetallePueblo | null = null;
  imagenActivaIndex: number = 0;
  private autoPlayTimer: ReturnType<typeof setInterval> | null = null;

  private baseDeDatosPueblos: Record<string, DetallePueblo> = {
    calvillo: {
      id: 'calvillo',
      nombre: 'Calvillo Pueblo Mágico',
      subtitulo: 'Calvillo el pueblo mágico que huele a guayaba y magia por todos sus rincones.',
      carruselImagenes: [
        'assets/images/calvillo-1.jpg',
        'assets/images/calvillo-2.jpg',
        'assets/images/calvillo-3.jpg'
      ],
      historiaPart1: [
        'No se sabe quiénes fueron los primeros habitantes, solo se han encontrado evidencias en algunas cuevas con pinturas rupestres en el Tepozan y en la Sierra del Laurel.',
        'Los pueblos que sabemos que habito la zona es el chichimeca y caxcano el cual llego del norte y apareció a fines del siglo XII. Hay evidencia de que no se dieron asentamientos prehispánicos importantes en la zona solo pequeños grupos que vivían de la caza y recolección.',
        'El primer contacto de los españoles con la región calvillense debió acontecer a principios de 1530 y es a partir de 1542 cuando se comienza la colonización formal de la zona de Calvillo los españoles que se establecieron se dedicaron al cultivo de cría y matanza de ganado, producción de granos, frutales, productos agro-ganaderos, artesanales y textiles.'
      ],
      imagenViejita: 'assets/images/don-eligio.jpg',
      pieImagenViejita: 'Fotografía histórica de Calvillo Antiguo - Don Eligio',
      historiaPart2: 'Los habitantes del Valle de Huajucar hicieron llegar a las autoridades eclesiásticas un pedimento de que se dividiera la parroquia de Tabasco Zac., a la que estaban sujetos. Argumentaban que por la distancia no eran atendidos espiritualmente. Y la única manera de resolver esto era crear una nueva parroquia con sede el Valle. Don José Calvillo dueño de la Hacienda de Sn Nicolás, Fernando Martínez Sotomayor dueño de la parcinomería de la Hacienda de San José de Gracia y D. José Conteras Domingo Velasco dueños de Ojocaliente, offeredieron tierras para la fundación del Pueblo el 16 de noviembre de 1771 se autoriza que se dividiera el nuevo Curato en el Valle de Huajucar. Se colocan los cimientos de la Iglesia el 12 de diciembre de 1772, y hasta 1778 se comenzaron a vender 149 solares que comprendería el centro histórico y sus alrededores.',
      comoLlegar: {
        autobus: 'Estrella Blanca, ETN, Flecha Amarilla, Primera Plus y Omnibus de México llegan a la ciudad de Aguascalientes. De ahí salen varios camiones a Calvillo.',
        avion: 'Aeroméxico, Interjet y Volaris llegan a la ciudad de Aguascalientes.'
      },
      rutasTranvia: [
        {
          id: 'guayaba',
          nombre: 'Ruta de La Guayaba',
          descripcion: 'El recorrido consiste en visitar un huerto de guayaba ubicada en la comunidad de el Chiquihuitero en el cual el visitante tendrá la oportunidad de conocer el árbol, la fruta y los beneficios de esta. Se hace un pequeño recorrido por el huerto en temporada de cosecha pueden los visitantes cortar guayabas. También reciben información acerca del cultivo y cuidados, así como una visita dentro de la fábrica en la cual pueden conocer el proceso para la elaboración de dulces y repostería fina en base a la guayaba y una gran degustación de estos.',
          costoAdultos: '$ 65.00',
          costoNinos: '$ 50.00 (Tercera edad y menores de 6 a 12 años)',
          horario: 'de 10:00 a.m. a 5:00 p.m. (cada hora sale el tranvía)',
          imagen: 'assets/images/ruta-guayaba.jpg'
        },
        {
          id: 'malpaso',
          nombre: 'Ruta de Malpaso',
          descripcion: 'Este recorrido consta de dos visitas iniciando con la fábrica de dulces de guayaba en la cual de manera breve de aproximadamente 20 minutos conoceremos el proceso y elaboración de dulces. Continuamos con el recorrido hacia la comunidad de malpaso el cual veremos por la parte baja y en camino de la presa, tendremos la oportunidad de contemplar la variedad de cultivos como aguacate, granada, guayaba y sus paisajes como la Sierra del Laurel, Sierra Fría y el Valle.',
          costoAdultos: '$ 60.00',
          costoNinos: '$ 45.00 (Tercera edad y menores de 6 a 12 años)',
          horario: 'de 10:00 a.m. a 5:00 p.m. (cada hora sale el tranvía)',
          imagen: 'assets/images/ruta-malpaso.jpg'
        },
        {
          id: 'codorniz',
          nombre: 'Ruta Presa de la Codorniz',
          descripcion: 'En esta nos dirigimos por la carretera 70 hacia la panadera y posterior tomamos la 50 que nos conduce a nuestro destino. Al llegar a la presa de la Codorniz bajamos a la orilla y tomamos un tiempo para la vista. Al regreso visitamos el Spa Yolihuani y el templo de San Judas Tadeo.',
          costoAdultos: '$ 60.00',
          costoNinos: '$ 45.00 (Tercera edad y menores de 6 a 12 años)',
          horario: 'de 10:00 a.m. a 5:00 p.m. (cada hora sale el tranvía)',
          imagen: 'assets/images/ruta-codorniz.jpg'
        },
        {
          id: 'artesanal',
          nombre: 'Ruta Artesanal',
          descripcion: 'Consiste en visitar talleres artesanales de arte en madera y piedra, fábrica de dulces, taller de queso, panadería y joyería orgánica.',
          costoAdultos: '$ 60.00',
          costoNinos: '$ 45.00 (Tercera edad y menores de 6 a 12 años)',
          horario: 'de 10:00 a.m. a 5:00 p.m. (cada hora sale el tranvía)',
          imagen: 'assets/images/ruta-artesanal.jpg'
        },
        {
          id: 'santacruz',
          nombre: 'Ruta Santa Cruz',
          descripcion: 'Recorrido hacia el mirador de la Santa Cruz para admirar el monumento y la vista panorámica del Valle de Huajúcar.',
          costoAdultos: '$ 60.00',
          costoNinos: '$ 45.00',
          horario: 'de 10:00 a.m. a 5:00 p.m.',
          imagen: 'assets/images/ruta-santacruz.jpg'
        },
        {
          id: 'cantinas',
          nombre: 'Ruta de las Cantinas Tradicionales',
          descripcion: 'Recorrido histórico por las cantinas tradicionales del centro de Calvillo.',
          costoAdultos: '$ 70.00',
          costoNinos: 'Solo mayores de edad',
          horario: 'de 12:00 p.m. a 6:00 p.m.',
          imagen: 'assets/images/ruta-cantinas.jpg'
        }
      ]
    },
    'san-jose-de-gracia': {
      id: 'san-jose-de-gracia',
      nombre: 'San José de Gracia',
      subtitulo: 'Es un pueblo mágico inmerso en la naturaleza, con una población que destaca por su calidez.',
      carruselImagenes: [
        'assets/images/sanjose-1.jpg',
        'assets/images/sanjose-2.jpg'
      ],
      historiaPart1: [
        'San José de Gracia fue fundado a mediados del siglo XVIII. Su historia cambió con la construcción de la Presa Plutarco Elías Calles en 1928.'
      ],
      imagenViejita: 'assets/images/sanjose-antiguo.jpg',
      pieImagenViejita: 'Pueblo antiguo antes de la inundación de la presa',
      historiaPart2: 'Hoy en día es uno de los destinos turísticos y de fe más importantes del estado, conocido por el Cristo Roto.',
      comoLlegar: {
        autobus: 'Salidas periódicas en camión desde la Terminal de Autobuses de Aguascalientes.',
        avion: 'Llegada al Aeropuerto Internacional de Aguascalientes y traslado por carretera.'
      },
      rutasTranvia: [
        {
          id: 'cristo-roto',
          nombre: 'Ruta Santuario del Cristo Roto',
          descripcion: 'Paseo en lancha y recorrido guiado hacia la isla de la presa para visitar la escultura del Cristo Roto.',
          costoAdultos: '$ 80.00',
          costoNinos: '$ 50.00',
          horario: 'de 9:00 a.m. a 6:00 p.m.',
          imagen: 'assets/images/ruta-cristoroto.jpg'
        }
      ]
    }
  };

  constructor() {
    addIcons({
      'home': home,
      'search-outline': searchOutline,
      'heart-outline': heartOutline,
      'settings-outline': settingsOutline,
      'arrow-back-outline': arrowBackOutline,
      'bus-outline': busOutline,
      'airplane-outline': airplaneOutline,
      'map-outline': mapOutline,
      'cash-outline': cashOutline,
      'time-outline': timeOutline
    });
  }

  ngOnInit(): void {
    const puebloId = this.route.snapshot.paramMap.get('id') || 'calvillo';
    this.pueblo = this.baseDeDatosPueblos[puebloId] || this.baseDeDatosPueblos['calvillo'];
    this.iniciarAutoPlay();
  }

  ngOnDestroy(): void {
    this.detenerAutoPlay();
  }

  iniciarAutoPlay(): void {
    this.detenerAutoPlay();
    this.autoPlayTimer = setInterval(() => {
      if (!this.pueblo || !this.pueblo.carruselImagenes.length) return;
      const total = this.pueblo.carruselImagenes.length;
      const siguienteIndex = (this.imagenActivaIndex + 1) % total;

      if (this.carouselRef?.nativeElement) {
        this.irAImagen(siguienteIndex, this.carouselRef.nativeElement);
      }
    }, 3500);
  }

  detenerAutoPlay(): void {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = null;
    }
  }

  onScrollCarousel(event: Event): void {
    const container = event.target as HTMLElement;
    const scrollPosition = container.scrollLeft;
    const width = container.clientWidth;
    if (width > 0) {
      this.imagenActivaIndex = Math.round(scrollPosition / width);
    }
  }

  irAImagen(index: number, container: HTMLElement): void {
    this.imagenActivaIndex = index;
    container.scrollTo({
      left: index * container.clientWidth,
      behavior: 'smooth'
    });
  }

  seleccionarImagen(index: number, container: HTMLElement): void {
    this.irAImagen(index, container);
    this.iniciarAutoPlay();
  }

  regresar(): void {
    this.navCtrl.back();
  }

  irANavegacion(ruta: string): void {
    void this.navCtrl.navigateForward(ruta);
  }

  esRutaActiva(rutaBase: string): boolean {
    if (rutaBase === '/home' && (this.router.url.startsWith('/historia-pueblo') || this.router.url.startsWith('/explora-pueblos'))) {
      return true;
    }
    return this.router.url.startsWith(rutaBase);
  }

  onImgError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = 'https://via.placeholder.com/600x400/2a2a3b/ffffff?text=Imagen+Pueblo';
  }
}