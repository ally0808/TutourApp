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
    gallery: ['assets/images/el-manantial.png'],
    phone: '4959580968',
    whatsapp: '524959580968',
    hours: 'Lunes a Domingo: 24.00 horas',
    priceRange: 'Desde $1,500.00 MXN',
    about: [
      'El Manantial es un espacio familiar y accesible que ofrece un ambiente tranquilo y cómodo para todas las edades.',
      'Contamos con una cabaña premium totalmente equipada y una segunda cabaña con alberca, ideal para descansar y disfrutar en un entorno natural y privado.'
    ],
    offers: [
      'Cabaña premium equipada',
      'Cabaña con alberca privada',
      'Instalaciones familiares y seguras'
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
      'Taquería El Popular es una taquería familiar con más de 20 años de experiencia donde cada taco y salsa es especial e inigualable en sabor, sazón y textura.',
      'Nos distingue nuestra gran variedad de salsas y niveles de picor para acompañar cada platillo.'
    ],
    offers: [
      'Tacos y Quesadillas de Bistec',
      'Lechón, Costilla y Adobada',
      'Tripa e Hígado',
      'Salsa roja, verde, mortajada y macha'
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
      'Llévate una experiencia única de Calvillo disfrutando una de las hermosas y exclusivas vistas al centro histórico.',
      'Combinamos nuestros sabores en desayunos, snacks y coctelería especial en la tan conocida calle de Las Graditas.'
    ],
    offers: [
      'Huevos al gusto, Baguettes y Ensaladas',
      'Alitas, Hamburguesas y Aguachiles',
      'Tacos de Arrachera y Camarón',
      'Waffles y Crepas de Guayaba',
      'Coctelería especial y Cerveza'
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
      'La Casa del Artesano es un centro donde encontrarás todas las artesanías que se producen en el municipio de Calvillo, Pueblo Mágico.',
      'Aprecia y adquiere trabajos de deshilado, madera, cestería de mimbre, bisutería y joyería de piedras semipreciosas como ópalo.'
    ],
    offers: [
      'Trabajos de deshilado tradicional',
      'Cestería de mimbre y madera',
      'Joyería en piedras semipreciosas',
      'Cafetería y área didáctica'
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
      'Ofrecemos una amplia variedad de dulces típicos elaborados artesanalmente por manos calvillenses.',
      'Destacan nuestros emblemáticos dulces de guayaba marca Flor de Calvillo, chamucos, tamarindos, dulces de leche y artesanías locales.'
    ],
    offers: [
      'Dulces de guayaba tradicionales',
      'Chamucos y tamarindos artesanal',
      'Dulces de leche regionales',
      'Artesanías típicas mexicanas'
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
      'Jardín La Lagunita en colaboración con Mi Vida Colección de Bodas crea experiencias memorables y románticas.',
      'Artesanos y empresarios locales especialistas en diseño de eventos para lograr que tu boda o evento sea perfecto.'
    ],
    offers: [
      'Wedding Planner profesional',
      'Diseño y producción de eventos',
      'Tours turísticos',
      'Servicio de Catering y Hostelería'
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
      '¡Que tu aventura en Calvillo inicie mágicamente deliciosa! Te esperamos para gozar de un desayuno inigualable.',
      'Disfruta de postres y café en una casona llena de historia, ambiente agradable y áreas al aire libre.'
    ],
    offers: [
      'Omelettes Denver y Molletes',
      'Chilaquiles y Huevos Rancheros',
      'Baguette de pollo y Ensaladas',
      'Hot cakes y Pan francés',
      'Coctel de frutas, jugos y café'
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
      'Enamórate del exquisito sabor de nuestras populares empapeladas, chascas y dorichascas con granos de elote cocidos en su punto.',
      'Con más de 10 años complaciendo a miles de turistas y calvillenses, somos una parada obligatoria en tu visita.'
    ],
    offers: [
      'Empapeladas de Arrachera, Camarón y 3 Quesos',
      'Chascas tradicionales',
      'Tostitos preparados y Dorichascas',
      'Frappes y Bebidas frías'
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
      'Parte de la familia de Mariscos La Fragua. Nuestra sazón es única donde puedes gozar de nuestros exclusivos molcajetes.',
      'Ambiente 100% familiar con la mejor selección en cortes de carne, mariscos y especialidades de la casa.'
    ],
    offers: [
      'Molcajete Azteca y Molcajete Marino',
      'Cocteles, Aguachiles y Ceviche',
      'Cortes de carne y Milanesas',
      'Tilapias y Filetes empanizados'
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
      'Un espacio de relajación y bienestar holístico enclavado en la naturaleza que te invita a conectar con tu cuerpo, mente y espíritu.',
      'Disfruta de técnicas ancestrales de temazcal, masajes, hidroterapia y terapias alternativas en un resort de primer nivel.'
    ],
    offers: [
      'Terapias de relajación y Masajes',
      'Temazcal ancestral e Hidroterapia',
      'Spa integral y tratamientos holísticos',
      'Estancias de bienestar y nutrición'
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
      'Somos un restaurante campestre de comida italiana con un ambiente cálido y hogareño en el que disfrutarás de hermosos paisajes y atardeceres.',
      'Deliciosos platillos italianos elaborados con ingredientes de alta calidad y frescura.'
    ],
    offers: [
      'Pizzas artesanales al horno',
      'Fettuccine, Pasta Primavera y Lasaña',
      'Camarones Cajún y Pescado a la Veracruzana',
      'Postres italianos artesanales'
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