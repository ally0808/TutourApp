import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonIcon, NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { addIcons } from 'ionicons';
import {
  home,
  searchOutline,
  heartOutline,
  settingsOutline,
  arrowBackOutline
} from 'ionicons/icons';

export interface VideoComunidad {
  id: string;
  titulo: string;
  canal: string;
  urlRaw: string;
  urlSafe?: SafeResourceUrl;
}

@Component({
  selector: 'app-comunidad',
  templateUrl: './comunidad.page.html',
  styleUrls: ['./comunidad.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonIcon]
})
export class ComunidadPage implements OnInit {
  private navCtrl = inject(NavController);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private sanitizer = inject(DomSanitizer);

  comunidadId: string | null = null;

  videos: VideoComunidad[] = [
    {
      id: 'video-1',
      titulo: '¿Qué es Tutour Pueblos Mágicos?',
      canal: 'Tutour Pueblos Mágicos',
      urlRaw: 'https://www.youtube.com/embed/h2_zQ-C5jw4'
    },
    {
      id: 'video-2',
      titulo: '"Todo pueblo mágico debe estar en Tutour" - José',
      canal: 'Tutour Pueblos Mágicos',
      urlRaw: 'https://www.youtube.com/embed/UUZIxGnpG3Q'
    }
  ];

  constructor() {
    addIcons({
      home,
      searchOutline,
      heartOutline,
      settingsOutline,
      arrowBackOutline
    });
  }

  ngOnInit(): void {
    this.comunidadId = this.route.snapshot.paramMap.get('id');

    this.videos = this.videos.map(v => ({
      ...v,
      urlSafe: this.sanitizer.bypassSecurityTrustResourceUrl(v.urlRaw)
    }));
  }

  // 👈 AGREGA ESTE MÉTODO PARA QUITAR EL ERROR ROJO
  regresar(): void {
    void this.navCtrl.back();
  }

  irANavegacion(ruta: string): void {
    void this.navCtrl.navigateForward(ruta);
  }

  esRutaActiva(rutaBase: string): boolean {
    return this.router.url.startsWith(rutaBase);
  }
}