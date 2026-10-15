/**
 * Catálogo compartido de establecimientos.
 * Lo usan Explorar, Favoritos e Inicio para que los IDs sean consistentes.
 */
export interface Lugar {
  id: number;
  name: string;
  category: string;
  color: string;
  rating: string;
  reviews: string;
  location: string;
  image: string;
  mapQuery?: string;
}

export const LUGARES: Lugar[] = [
  {
    id: 1,
    name: 'Cabañas Don Chava',
    category: 'Hospedaje',
    color: '#4DBEC9',
    rating: '4.9',
    reviews: '1200',
    location: 'Calle 5 de Mayo #104, Zona Centro.',
    mapQuery: 'Cabañas Don Chava, Calvillo',
    image: 'assets/images/cabanas-don-chava.png'
  },
  {
    id: 2,
    name: 'Grada Noventa y Seis',
    category: 'Bares',
    color: '#E01E2E',
    rating: '4.8',
    reviews: '500',
    location: 'Calle 5 de Mayo #104, Zona Centro.',
    mapQuery: 'Grada Noventa y Seis, Calvillo',
    image: 'assets/images/grada-noventa-y-seis.png'
  },
  {
    id: 3,
    name: 'Panadería Don Emiliano',
    category: 'Sabores de mi pueblo',
    color: '#FAA954',
    rating: '5.0',
    reviews: '3000',
    location: 'Calle 5 de Mayo #104, Zona Centro.',
    mapQuery: 'Panadería Don Emiliano, Calvillo',
    image: 'assets/images/panaderia-don-emiliano.png'
  },
  {
    id: 4,
    name: 'Restaurante Camino Viejo',
    category: 'Restaurante',
    color: '#E06D44',
    rating: '5.0',
    reviews: '250',
    location: 'Presa Malpaso, 20834 Ags., Mexico',
    mapQuery: 'Presa Malpaso, 20834 Ags., Mexico',
    image: 'assets/images/restaurante-camino-viejo.png'
  },
  {
    id: 5,
    name: 'Yolihuani Relax Resort',
    category: 'Hospedaje',
    color: '#4DBEC9',
    rating: '5.0',
    reviews: '180',
    location: 'Carretera La Panadera-Palo Alto km 14, Calvillo, México.',
    mapQuery: 'Yolihuani Relax Resort, Calvillo',
    image: 'assets/images/yolihuani-relax-resort.png'
  },
  {
    id: 6,
    name: 'Cenaduría Doña Lupe',
    category: 'Cenadurías',
    color: '#CB7246',
    rating: '4.9',
    reviews: '420',
    location: 'Calle 5 de Mayo #104, Zona Centro.',
    mapQuery: 'Calle 5 de Mayo, Calvillo, Aguascalientes',
    image: 'assets/images/panaderia-don-emiliano.png'
  },
  {
    id: 7,
    name: 'Parque La Cueva Aventura',
    category: 'Lugares recreativos',
    color: '#660066',
    rating: '4.8',
    reviews: '850',
    location: 'Carretera Calvillo-Jalpa Km 55, Calvillo, Ags.',
    mapQuery: 'La Cueva, Calvillo, Aguascalientes',
    image: 'assets/images/banner-alojamiento.jpg'
  },
  {
    id: 8,
    name: 'Desayunos El Rinconcito',
    category: 'Desayunos',
    color: '#9DC03E',
    rating: '4.9',
    reviews: '610',
    location: 'Calle 5 de Mayo #104, Zona Centro.',
    mapQuery: 'Calle 5 de Mayo, Calvillo',
    image: 'assets/images/banner-gastronomia.jpg'
  },
  {
    id: 9,
    name: 'Taller de Deshilado y Artesanías',
    category: 'Artesanías',
    color: '#8F2368',
    rating: '5.0',
    reviews: '980',
    location: 'Calle 5 de Mayo #104, Zona Centro.',
    mapQuery: 'Artesanias Calvillo, Aguascalientes',
    image: 'assets/images/calvillo-iglesia.png'
  }
];
