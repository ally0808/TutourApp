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
    path: 'detalle-empresa',
    loadComponent: () => import('./detalle-empresa/detalle-empresa.page').then(m => m.DetalleEmpresaPage)
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
    path: 'configuracion',
    loadComponent: () =>
      import('./configuracion/configuracion.page').then((m) => m.ConfiguracionPage),
  },
  {
    path: 'uso-tutour',
    loadComponent: () =>
      import('./uso-tutour/uso-tutour.page').then((m) => m.UsoTutourPage),
  },
  {
    path: 'sobre-nosotros',
    loadComponent: () =>
      import('./sobre-nosotros/sobre-nosotros.page').then((m) => m.SobreNosotrosPage),
  },
  {
    path: 'idioma',
    loadComponent: () =>
      import('./idioma/idioma.page').then((m) => m.IdiomaPage),
  },
  {
    path: 'privacidad',
    loadComponent: () =>
      import('./privacidad/privacidad.page').then((m) => m.PrivacidadPage),
  },
  {
    path: 'contacto',
    loadComponent: () =>
      import('./contacto/contacto.page').then((m) => m.ContactoPage),
  },
  {
    path: 'gastronomia',
    loadComponent: () => import('./gastronomia/gastronomia.page').then(m => m.GastronomiaPage)
  },
  {
    path: 'gastronomia-calvillo',
    loadComponent: () => import('./gastronomia-calvillo/gastronomia-calvillo.page').then(m => m.GastronomiaCalvilloPage)
  },
  {
    path: 'gastronomia-calvillo',
    loadComponent: () => import('./gastronomia-calvillo/gastronomia-calvillo.page').then(m => m.GastronomiaCalvilloPage)
  },
  {
    path: 'alojamiento-aventura-calvillo',
    loadComponent: () => import('./alojamiento-aventura-calvillo/alojamiento-aventura-calvillo.page').then(m => m.AlojamientoAventuraCalvilloPage)
  },
    {
    path: 'alojamiento-info',
    loadComponent: () => import('./alojamiento-info/alojamiento-info.page').then(m => m.AlojamientoInfoPage)
  },
  {
  path: 'atractivos-info',
  loadComponent: () => import('./atractivos-info/atractivos-info.page').then(m => m.AtractivosInfoPage)
  },
  {
  path: 'atractivos-turisticos-calvillo',
  loadComponent: () => import('./atractivos-calvillo/atractivos-calvillo.page').then(m => m.AtractivosCalvilloPage)
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
  {
    path: '**', 
    redirectTo: 'explore'
  }
  
];