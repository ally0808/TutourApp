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
  path: 'detalle-empresa/:id',
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
    path: 'atractivos-info',
    loadComponent: () => import('./atractivos-info/atractivos-info.page').then(m => m.AtractivosInfoPage)
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
  path: 'explora-pueblos',
  loadComponent: () => import('./explora-pueblos/explora-pueblos.page').then(m => m.ExploraPueblosPage)
  },
  {
    path: 'historia-pueblo/:id',
    loadComponent: () => import('./historia-pueblo/historia-pueblo.page').then(m => m.HistoriaPuebloPage)
  },
  {
  path: 'articulos-blog',
  loadComponent: () => import('./articulos-blog/articulos-blog.page').then(m => m.ArticulosBlogPage)
  },
  {
  path: 'detalle-articulo/:id',
  loadComponent: () => import('./detalle-articulo/detalle-articulo.page').then(m => m.DetalleArticuloPage)
  },
  {
    path: 'comunidad',
    loadComponent: () => import('./comunidad/comunidad.page').then(m => m.ComunidadPage)
  },

  // RUTA CON PARÁMETRO: Permite cargar artículos o vistas específicas con ID
  {
    path: 'comunidad/:id',
    loadComponent: () => import('./comunidad/comunidad.page').then(m => m.ComunidadPage)
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