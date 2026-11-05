import { Component, inject } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
  standalone: true,
  imports: [IonContent],
})
export class SplashPage {
  private router = inject(Router);

  constructor() {
    setTimeout(() => {
      this.router.navigate(['/welcome']);
    }, 3000);
  }
}