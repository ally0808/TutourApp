import { Component, OnInit, inject } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
  standalone: true,
  imports: [IonContent],
})
export class WelcomePage implements OnInit {

  private router = inject(Router);

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 2000);
  }

}