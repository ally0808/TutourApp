export interface ServicioEmpresa {
  nombre: string;
  disponible: boolean;
}

export interface Lugar {
  id: number;
  name: string;
  category: string;
  rating: number;
  reviewsCount?: number;
  reviews?: number;
  color?: string;
  location: string;
  image: string;       // 📸 Foto de portada del restaurante
  logo?: string;        // 🏷️ Logotipo de la empresa
  gallery?: string[];   // 🖼️ Galería de fotos del restaurante
  phone?: string;
  whatsapp?: string;
  website?: string;
  facebook?: string;
  instagram?: string;
  hours?: string;
  priceRange?: string;
  about?: string[];
  offers?: string[];
  services?: ServicioEmpresa[];
  mapQuery?: string;
}

export const LUGARES: Lugar[] = [
  {
    id: 4,
    name: 'Restaurante Camino Viejo',
    category: 'Restaurantes',
    rating: 4.9,
    reviewsCount: 1200,
    reviews: 1200,
    color: '#e67e22',
    location: 'Presa de Malpaso, Calvillo, Aguascalientes.',
    
    // 📸 Foto del restaurante para portada/tarjetas
    image: 'assets/images/restaurante-camino-viejo.png',
    
    // 🏷️ Logo exclusivo (aquí va la foto del logo)
    logo: 'assets/images/camino-viejo.png',
    
    // 🖼️ Fotos para el carrusel superior (fotos del restaurante/platillos)
    gallery: [
      'assets/images/restaurante-camino-viejo.png'
    ],
    
    phone: '4951214060',
    whatsapp: '524951214060',
    website: 'http://www.caminoviejo.com.mx',
    hours: 'Todos los días: 12:00 p.m. a 7:00 p.m.',
    priceRange: '$200.00 a $400.00 MXN',
    about: [
      'Extraordinaria aventura que combina todo lo que Calvillo pueblo mágico del estado de Aguascalientes tiene, excelente gastronomía y los más bellos paisajes de todo el estado.',
      'Camino Viejo es una excelente opción para pasar una tarde agradable en compañía de la familia disfrutando de la hermosa vista y lo mejor en carnes y mariscos de la región.'
    ],
    offers: [
      'Ensaladas',
      'Cocteles',
      'Queso fundido',
      'Filete de pescado',
      'Cortes de Carnes',
      'Coctelería especial'
    ],
    services: [
      { nombre: 'Zona discapacitados', disponible: false },
      { nombre: 'Baños', disponible: true },
      { nombre: 'Estacionamiento', disponible: true },
      { nombre: 'Música ambiental', disponible: true },
      { nombre: 'WIFI', disponible: true },
      { nombre: 'Pago con tarjeta', disponible: true },
      { nombre: 'Área infantil', disponible: true },
      { nombre: 'Zona aire libre', disponible: true },
      { nombre: 'Comida y bebida', disponible: true }
    ],
    mapQuery: 'Restaurant Camino Viejo SA de CV, Presa de Malpaso, Calvillo'
  },
  {
    id: 1,
    name: 'Cabañas Don Chava',
    category: 'Hospedaje',
    rating: 4.9,
    reviewsCount: 1200,
    reviews: 1200,
    color: '#27ae60',
    location: 'Carretera al Maguey no. 201 El Sauz, Calvillo Aguascalientes',
    image: 'assets/images/cabanas-don-chava.png',
    logo: 'assets/images/don-chava-logo.png',
    gallery: [
      'assets/images/cabanas-don-chava.png'
    ],
    phone: '4951234567',
    whatsapp: '524951234567',
    website: 'http://www.cabanasdonchava.com',
    hours: 'Atención 24 hrs',
    priceRange: '$800.00 a $2,500.00 MXN',
    about: [
      'Cabañas Don Chava te brinda descanso y tranquilidad en armonía con la naturaleza, acompañados de bellos atardeceres que solo nos da el bello pueblo mágico de Calvillo.'
    ],
    offers: [
      'Cabañas matrimoniales',
      'Cabañas familiares',
      'Asadores privados',
      'Áreas verdes'
    ],
    services: [
      { nombre: 'Zona discapacitados', disponible: true },
      { nombre: 'Baños', disponible: true },
      { nombre: 'Estacionamiento', disponible: true },
      { nombre: 'WIFI', disponible: true },
      { nombre: 'Pago con tarjeta', disponible: true },
      { nombre: 'Agua caliente', disponible: true },
      { nombre: 'Pet friendly', disponible: true },
      { nombre: 'Piscina', disponible: true }
    ],
    mapQuery: 'Carretera al Maguey no. 201 El Sauz, Calvillo'
  }
];