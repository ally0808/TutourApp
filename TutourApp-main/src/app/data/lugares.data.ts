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
  image: string;       
  logo?: string;        
  gallery?: string[];   
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
  // 1. HOSPEDAJE - EL MANANTIAL
  {
    id: 1,
    name: 'El Manantial',
    category: 'Hospedaje',
    rating: 4.8,
    reviewsCount: 450,
    reviews: 450,
    color: '#5CC6D0',
    location: 'San Isidro no. 149, Carretera los Patos, Calvillo, Ags.',
    image: 'assets/images/el-manantial.png',
    logo: 'assets/icon/logo-el-manantial.png', // 🏷️ Coloca aquí la imagen del logo
    gallery: ['assets/images/el-manantial.png','assets/images/el-manantial01.jpg','assets/images/el-manantial02.jpg','assets/images/el-manantial03.jpg','assets/images/el-manantial04.jpg'],
    phone: '4959580968',
    whatsapp: '524959580968',
    hours: 'Lunes a Domingo: 24.00 horas',
    priceRange: 'Desde $1,500.00 MXN',
    about: [
      'MANANTIAL_ABOUT_1',
      'MANANTIAL_ABOUT_2'
    ],
    offers: [
      'MANANTIAL_OFFER_1',
      'MANANTIAL_OFFER_2',
      'MANANTIAL_OFFER_3'
    ],
    services: [
      { nombre: 'Zona discapacitados', disponible: true },
      { nombre: 'Baños', disponible: true },
      { nombre: 'Estacionamiento', disponible: true },
      { nombre: 'Música ambiental', disponible: true },
      { nombre: 'WIFI', disponible: true },
      { nombre: 'Pago con tarjeta', disponible: true },
      { nombre: 'Aire acondicionado', disponible: true },
      { nombre: 'Área infantil', disponible: true },
      { nombre: 'Pet friendly', disponible: true },
      { nombre: 'Piscina', disponible: true }
    ],
    mapQuery: 'San Isidro 149, Carretera los Patos, Calvillo, Ags.'
  },

  // 2. CENADURÍAS - TAQUERÍA EL POPULAR
  {
    id: 2,
    name: 'Taquería El Popular',
    category: 'Cenadurías',
    rating: 4.9,
    reviewsCount: 890,
    reviews: 890,
    color: '#D07A58',
    location: 'Boulevard Rodolfo Landeros no. 155, Zona Centro, Calvillo, Ags.',
    image: 'assets/images/taqueria-el-popular.png',
    logo: 'assets/icon/logo-taqueria-el-popular.png', // 🏷️ Coloca aquí la imagen del logo
    gallery: ['assets/images/taqueria-el-popular.png'],
    phone: '4959589897',
    whatsapp: '524959589897',
    hours: 'Lun-Vie: 1:30 pm a 10:00 pm | Sáb: 1:30 pm a 11:30 pm | Dom: 1:30 pm a 12:00 am',
    priceRange: 'Desde $50.00 MXN',
    about: [
      'TAQUERIA_EL_POPULAR_ABOUT_1',
      'TAQUERIA_EL_POPULAR_ABOUT_2'
    ],
    offers: [
      'TAQUERIA_EL_POPULAR_OFFER_1',
      'TAQUERIA_EL_POPULAR_OFFER_2',
      'TAQUERIA_EL_POPULAR_OFFER_3',
      'TAQUERIA_EL_POPULAR_OFFER_4'
    ],
    services: [
      { nombre: 'Baños', disponible: true },
      { nombre: 'Estacionamiento', disponible: true },
      { nombre: 'Pago con tarjeta', disponible: true },
      { nombre: 'Servicio a domicilio', disponible: true },
      { nombre: 'Comida y bebida', disponible: true }
    ],
    mapQuery: 'Blvd. Rodolfo Landeros Gallegos 155, Zona Centro, 20800 Calvillo, Ags.'
  },

  // 3. BARES / GASTRONOMÍA - GRADA NOVENTA Y SEIS
  {
    id: 3,
    name: 'Grada Noventa y Seis',
    category: 'Bares',
    rating: 4.9,
    reviewsCount: 620,
    reviews: 620,
    color: '#FF0000',
    location: 'Matamoros #508, Zona Centro, Calvillo, Ags. (Las Graditas)',
    image: 'assets/images/grada-noventa-y-seis.png',
    logo: 'assets/images/logo-grada-noventa-y-seis.png', // 🏷️ Coloca aquí la imagen del logo
    gallery: ['assets/images/grada-noventa-y-seis.png'],
    phone: '4951037451',
    whatsapp: '524951037451',
    hours: 'Todos los días (Cerrado Miércoles): 9:00 a.m. a 12:00 a.m.',
    priceRange: '$50.00 a $200.00 MXN',
    about: [
      'GRADA_NOVENTA_Y_SEIS_ABOUT_1',
      'GRADA_NOVENTA_Y_SEIS_ABOUT_2'
    ],
    offers: [
      'GRADA_NOVENTA_Y_SEIS_OFFER_1',
      'GRADA_NOVENTA_Y_SEIS_OFFER_2',
      'GRADA_NOVENTA_Y_SEIS_OFFER_3',
      'GRADA_NOVENTA_Y_SEIS_OFFER_4',
      'GRADA_NOVENTA_Y_SEIS_OFFER_5'
    ],
    services: [
      { nombre: 'Baños', disponible: true },
      { nombre: 'Música ambiental', disponible: true },
      { nombre: 'WIFI', disponible: true },
      { nombre: 'Pago con tarjeta', disponible: true },
      { nombre: 'Zona aire libre', disponible: true },
      { nombre: 'Comida y bebida', disponible: true }
    ],
    mapQuery: 'C. Matamoros 508, Zona Centro, 20800 Calvillo, Ags.'
  },

  // 4. ARTESANÍAS - CASA DEL ARTESANO
  {
    id: 4,
    name: 'Casa del Artesano',
    category: 'Artesanías',
    rating: 4.8,
    reviewsCount: 310,
    reviews: 310,
    color: '#E85D75',
    location: 'Zaragoza #300, Zona Centro, Calvillo, Ags.',
    image: 'assets/images/casa-del-artesano.png',
    logo: 'assets/images/logo-casa-del-artesano.png', // 🏷️ Coloca aquí la imagen del logo
    gallery: ['assets/images/casa-del-artesano.png'],
    phone: '4959560292',
    whatsapp: '524959560292',
    hours: 'Todos los días: 10:00 a.m. a 4:00 p.m.',
    priceRange: 'Acceso gratuito',
    about: [
      'CASA_DEL_ARTESANO_ABOUT_1',
      'CASA_DEL_ARTESANO_ABOUT_2'
    ],
    offers: [
      'CASA_DEL_ARTESANO_OFFER_1',
      'CASA_DEL_ARTESANO_OFFER_2',
      'CASA_DEL_ARTESANO_OFFER_3',
      'CASA_DEL_ARTESANO_OFFER_4'
    ],
    services: [
      { nombre: 'Zona discapacitados', disponible: true },
      { nombre: 'Baños', disponible: true },
      { nombre: 'Estacionamiento', disponible: true },
      { nombre: 'Pago con tarjeta', disponible: true },
      { nombre: 'Área infantil', disponible: true }
    ],
    mapQuery: 'Zaragoza 300, Zona Centro, Calvillo, Ags.'
  },

  // 5. SABORES DE MI PUEBLO - DULCERÍAS LA TRADICIONAL
  {
    id: 5,
    name: 'Dulcerías La Tradicional',
    category: 'Sabores de mi Pueblo',
    rating: 5.0,
    reviewsCount: 1050,
    reviews: 1050,
    color: '#F1C40F',
    location: '5 de mayo #107, Col. Centro, Calvillo, Ags.',
    image: 'assets/images/dulceria-la-tradicional.png',
    logo: 'assets/images/logo-dulceria-la-tradicional.png', // 🏷️ Coloca aquí la imagen del logo
    gallery: ['assets/images/dulceria-la-tradicional.png'],
    phone: '4951068684',
    whatsapp: '524951068684',
    hours: 'Todos los días: 10:00 a.m. a 8:00 p.m.',
    priceRange: 'Desde $30.00 a $3,000.00 MXN',
    about: [
      'DULCERIA_LA_TRADICIONAL_ABOUT_1',
      'DULCERIA_LA_TRADICIONAL_ABOUT_2'
    ],
    offers: [
      'DULCERIA_LA_TRADICIONAL_OFFER_1',
      'DULCERIA_LA_TRADICIONAL_OFFER_2',
      'DULCERIA_LA_TRADICIONAL_OFFER_3',
      'DULCERIA_LA_TRADICIONAL_OFFER_4'
    ],
    services: [
      { nombre: 'Baños', disponible: true },
      { nombre: 'Pago con tarjeta', disponible: true },
      { nombre: 'Servicio a domicilio', disponible: true }
    ],
    mapQuery: 'C. 5 de Mayo 115, Zona Centro, 20800 Calvillo, Ags.'
  },

  // 6. LUGARES RECREATIVOS - LA LAGUNITA
  {
    id: 6,
    name: 'La Lagunita',
    category: 'Lugares Recreativos',
    rating: 4.7,
    reviewsCount: 230,
    reviews: 230,
    color: '#8E44AD',
    location: 'Carretera Aguascalientes Calvillo km 43, Bajío de Colomos, Ags.',
    image: 'assets/images/la-lagunita.png',
    logo: 'assets/images/logo-la-lagunita.png', // 🏷️ Coloca aquí la imagen del logo
    gallery: ['assets/images/la-lagunita.png'],
    phone: '4951093130',
    whatsapp: '524951093130',
    hours: 'Lunes a Viernes: 1:00 p.m. a 6:00 p.m.',
    priceRange: 'Desde $10,000.00 MXN (Eventos)',
    about: [
      'LA_LAGUNITA_ABOUT_1',
      'LA_LAGUNITA_ABOUT_2'
    ],
    offers: [
      'LA_LAGUNITA_OFFER_1',
      'LA_LAGUNITA_OFFER_2',
      'LA_LAGUNITA_OFFER_3',
      'LA_LAGUNITA_OFFER_4'
    ],
    services: [
      { nombre: 'Estacionamiento', disponible: true },
      { nombre: 'Música ambiental', disponible: true },
      { nombre: 'Música en vivo', disponible: true },
      { nombre: 'Zona aire libre', disponible: true },
      { nombre: 'Catering', disponible: true }
    ],
    mapQuery: 'Blvd. Rodolfo Landeros Gallegos 1766, Ojocaliente, Ags.'
  },

  // 7. DESAYUNOS - TRITÓN DESAYUNOS
  {
    id: 7,
    name: 'Tritón Desayunos',
    category: 'Desayunos',
    rating: 4.9,
    reviewsCount: 540,
    reviews: 540,
    color: '#8BC34A',
    location: 'Colón #201, Colonia Centro, Calvillo, Aguascalientes',
    image: 'assets/images/triton-desayunos.png',
    logo: 'assets/images/logo-triton-desayunos.png', // 🏷️ Coloca aquí la imagen del logo
    gallery: ['assets/images/triton-desayunos.png'],
    phone: '4951030472',
    whatsapp: '524951030472',
    hours: 'Todos los días: 8:00 a.m. a 3:00 p.m.',
    priceRange: '$35.00 a $100.00 MXN',
    about: [
      'TRITON_DESAYUNOS_ABOUT_1',
      'TRITON_DESAYUNOS_ABOUT_2'
    ],
    offers: [
      'TRITON_DESAYUNOS_OFFER_1',
      'TRITON_DESAYUNOS_OFFER_2',
      'TRITON_DESAYUNOS_OFFER_3',
      'TRITON_DESAYUNOS_OFFER_4',
      'TRITON_DESAYUNOS_OFFER_5'
    ],
    services: [
      { nombre: 'Baños', disponible: true },
      { nombre: 'WIFI', disponible: true },
      { nombre: 'Pago con tarjeta', disponible: true },
      { nombre: 'Zona aire libre', disponible: true },
      { nombre: 'Comida y bebida', disponible: true }
    ],
    mapQuery: 'Tritón restaurante, Zona Centro, 20800 Calvillo, Ags.'
  },

  // 8. SABORES DE MI PUEBLO - EMPAPELADAS D’ ABEL
  {
    id: 8,
    name: 'Empapeladas D’ Abel',
    category: 'Sabores de mi Pueblo',
    rating: 4.8,
    reviewsCount: 920,
    reviews: 920,
    color: '#F1C40F',
    location: 'Independencia #101, Zona Centro, Calvillo, Ags.',
    image: 'assets/images/empapeladas-abel.png',
    logo: 'assets/images/logo-empapeladas-abel.png', // 🏷️ Coloca aquí la imagen del logo
    gallery: ['assets/images/empapeladas-abel.png'],
    phone: '4491115008',
    whatsapp: '524491115008',
    hours: 'Todos los días: 4:00 p.m. a 10:00 p.m.',
    priceRange: '$50.00 a $80.00 MXN',
    about: [
      'EMPAPERADAS_DE_ABEL_ABOUT_1',
      'EMPAPERADAS_DE_ABEL_ABOUT_2'
    ],
    offers: [
      'EMPAPERADAS_DE_ABEL_OFFER_1',
      'EMPAPERADAS_DE_ABEL_OFFER_2',
      'EMPAPERADAS_DE_ABEL_OFFER_3',
      'EMPAPERADAS_DE_ABEL_OFFER_4'
    ],
    services: [
      { nombre: 'Baños', disponible: true },
      { nombre: 'Servicio a domicilio', disponible: true },
      { nombre: 'Comida y bebida', disponible: true }
    ],
    mapQuery: 'C. Independencia 101C, Zona Centro, Calvillo, Ags.'
  },

  // 9. RESTAURANTES - RESTAURANTE LA ESPERANZA DE ELÍAS
  {
    id: 9,
    name: 'Restaurante La Esperanza de Elías',
    category: 'Restaurantes',
    rating: 4.9,
    reviewsCount: 1100,
    reviews: 1100,
    color: '#FAA954',
    location: 'Blvd. Rodolfo Landeros S/N, Calvillo, Ags. (Entrada al Cuervero)',
    image: 'assets/images/la-esperanza-de-elias.png',
    logo: 'assets/images/logo-la-esperanza-de-elias.png', // 🏷️ Coloca aquí la imagen del logo
    gallery: ['assets/images/la-esperanza-de-elias.png'],
    phone: '4959564255',
    whatsapp: '524959564255',
    hours: 'Todos los días: 11:00 a.m. a 7:00 p.m.',
    priceRange: '$95.00 a $300.00 MXN',
    about: [
      'LA_ESPERANZA_DE_ELIAS_ABOUT_1',
      'LA_ESPERANZA_DE_ELIAS_ABOUT_2'
    ],
    offers: [
      'LA_ESPERANZA_DE_ELIAS_OFFER_1',
      'LA_ESPERANZA_DE_ELIAS_OFFER_2',
      'LA_ESPERANZA_DE_ELIAS_OFFER_3',
      'LA_ESPERANZA_DE_ELIAS_OFFER_4'
    ],
    services: [
      { nombre: 'Zona discapacitados', disponible: true },
      { nombre: 'Baños', disponible: true },
      { nombre: 'Estacionamiento', disponible: true },
      { nombre: 'Música en vivo', disponible: true },
      { nombre: 'Área infantil', disponible: true },
      { nombre: 'Pago con tarjeta', disponible: true }
    ],
    mapQuery: 'La Esperanza de Elías, Arroyo Seco, 20834 Ojocaliente, Ags.'
  },

  // 10. HOSPEDAJE - YOLIHUANI RELAX RESORT
  {
    id: 10,
    name: 'Yolihuani Relax Resort',
    category: 'Hospedaje',
    rating: 5.0,
    reviewsCount: 780,
    reviews: 780,
    color: '#5CC6D0',
    location: 'Carretera La Panadera-Palo Alto km 14, Calvillo, México',
    image: 'assets/images/yolihuani-relax-resort.png',
    logo: 'assets/images/logo-yolihuani.png', // 🏷️ Coloca aquí la imagen del logo
    gallery: ['assets/images/yolihuani-relax-resort.png'],
    phone: '4959585833',
    whatsapp: '524959585833',
    website: 'https://yolihuani.mx/',
    hours: 'Lunes a Domingo: 9:00 a.m. a 8:00 p.m.',
    priceRange: 'Según paquete seleccionado',
    about: [
      'YOLIHUANI_RELAX_RESORT_ABOUT_1',
      'YOLIHUANI_RELAX_RESORT_ABOUT_2'
    ],
    offers: [
      'YOLIHUANI_RELAX_RESORT_OFFER_1',
      'YOLIHUANI_RELAX_RESORT_OFFER_2',
      'YOLIHUANI_RELAX_RESORT_OFFER_3',
      'YOLIHUANI_RELAX_RESORT_OFFER_4'
    ],
    services: [
      { nombre: 'Estacionamiento', disponible: true },
      { nombre: 'WIFI', disponible: true },
      { nombre: 'Pago con tarjeta', disponible: true },
      { nombre: 'Agua caliente', disponible: true },
      { nombre: 'Zona aire libre', disponible: true }
    ],
    mapQuery: 'Yolihuani Relax Resort, Carr. la Panadera - Palo Alto Km. 14, Ags.'
  },

  // 11. RESTAURANTES - RESTAURANTE LA MÍA CASA
  {
    id: 11,
    name: 'Restaurante La Mía Casa',
    category: 'Restaurantes',
    rating: 4.8,
    reviewsCount: 390,
    reviews: 390,
    color: '#FAA954',
    location: 'Rancho López, Rinconada, Calvillo, Ags.',
    image: 'assets/images/la-mia-casa.png',
    logo: 'assets/images/logo-la-mia-casa.png', // 🏷️ Coloca aquí la imagen del logo
    gallery: ['assets/images/la-mia-casa.png'],
    phone: '4951271022',
    whatsapp: '524951271022',
    hours: 'Jueves a Domingos: 3:00 p.m. a 10:00 p.m.',
    priceRange: '$200.00 a $400.00 MXN',
    about: [
      'LA_MIA_CASA_ABOUT_1',
      'LA_MIA_CASA_ABOUT_2'
    ],
    offers: [
      'LA_MIA_CASA_OFFER_1',
      'LA_MIA_CASA_OFFER_2',
      'LA_MIA_CASA_OFFER_3',
      'LA_MIA_CASA_OFFER_4'
    ],
    services: [
      { nombre: 'Estacionamiento', disponible: true },
      { nombre: 'Música ambiental', disponible: true },
      { nombre: 'Pago con tarjeta', disponible: true },
      { nombre: 'Zona aire libre', disponible: true },
      { nombre: 'Comida y bebida', disponible: true }
    ],
    mapQuery: 'La Mía Casa restaurante, Rinconada, Ags.'
  }
];