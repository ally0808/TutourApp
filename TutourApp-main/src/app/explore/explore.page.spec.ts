import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ExplorePage } from './explore.page';

describe('ExplorePage', () => {
  let component: ExplorePage;
  let fixture: ComponentFixture<ExplorePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExplorePage],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(ExplorePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debe tener las categorías solicitadas en el carrusel', () => {
    const nombres = component.categories.map((c) => c.name);
    expect(nombres).toContain('Todos');
    expect(nombres).toContain('Hospedaje');
    expect(nombres).toContain('Restaurante');
    expect(nombres).toContain('Lugares recreativos');
    expect(nombres).toContain('Desayunos');
    expect(nombres).toContain('Cenadurías');
    expect(nombres).toContain('Sabores de mi pueblo');
    expect(nombres).toContain('Artesanías');
    expect(nombres).toContain('Bares');
  });

  it('debe iniciar en vista de lista con Todos seleccionado', () => {
    expect(component.vistaActual).toBe('lista');
    expect(component.categoriaSeleccionada).toBe('Todos');
    expect(component.lugaresFiltrados.length).toBeGreaterThan(0);
  });

  it('debe alternar entre vista lista y mapa', () => {
    component.cambiarVista('mapa');
    expect(component.vistaActual).toBe('mapa');
    expect(component.negocioSeleccionadoMapa).toBeTruthy();

    component.cambiarVista('lista');
    expect(component.vistaActual).toBe('lista');
  });

  it('debe filtrar y actualizar el mapa al buscar Camino', () => {
    component.busqueda = 'Camino';
    component.alBuscar();

    expect(component.negocioSeleccionadoMapa).toBeTruthy();
    expect(component.negocioSeleccionadoMapa?.name).toBe('Restaurante Camino Viejo');
    expect(component.negocioSeleccionadoMapa?.location).toContain('Presa Malpaso');
  });

  it('debe filtrar y actualizar el mapa al buscar Chava', () => {
    component.busqueda = 'Chava';
    component.alBuscar();

    expect(component.negocioSeleccionadoMapa).toBeTruthy();
    expect(component.negocioSeleccionadoMapa?.name).toBe('Cabañas Don Chava');
  });

  it('debe filtrar por categoría seleccionada', () => {
    component.seleccionarCategoria('Bares');
    expect(component.categoriaSeleccionada).toBe('Bares');
    expect(component.lugaresFiltrados.length).toBe(1);
    expect(component.lugaresFiltrados[0].name).toBe('Grada Noventa y Seis');
    expect(component.negocioSeleccionadoMapa?.name).toBe('Grada Noventa y Seis');
  });

  it('debe alternar favoritos correctamente', () => {
    const primerId = component.places[0].id;
    expect(component.esFavorito(primerId)).toBe(false);

    component.alternarFavorito(primerId);
    expect(component.esFavorito(primerId)).toBe(true);

    component.alternarFavorito(primerId);
    expect(component.esFavorito(primerId)).toBe(false);
  });

  it('debe seleccionar negocio para ver en mapa', () => {
    const lugar = component.places[1]; // Grada Noventa y Seis
    component.verEnMapa(lugar);

    expect(component.vistaActual).toBe('mapa');
    expect(component.negocioSeleccionadoMapa?.name).toBe('Grada Noventa y Seis');
  });
});
