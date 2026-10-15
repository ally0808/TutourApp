import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'splash',
    loadComponent: () =>
      import('./splash/splash.page').then((m) => m.SplashPage),
  },
  {
    path: 'welcome',
    loadComponent: () =>
      import('./welcome/welcome.page').then((m) => m.WelcomePage),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'explore',
    loadComponent: () =>
      import('./explore/explore.page').then((m) => m.ExplorePage),
  },
  {
    path: 'favorites',
    loadComponent: () =>
      import('./favorites/favorites.page').then((m) => m.FavoritesPage),
  },
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'splash',
  },
  
];