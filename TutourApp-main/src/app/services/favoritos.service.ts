import { Injectable, computed, signal } from '@angular/core';
import { LUGARES, Lugar } from '../data/lugares.data';

/**
 * Servicio único de favoritos.
 * Guarda los IDs en localStorage y los expone como signal para que
 * todas las páginas (que ion-router-outlet mantiene vivas) se sincronicen.
 */
@Injectable({ providedIn: 'root' })
export class FavoritosService {
  private readonly claveFavoritos = 'tutour-favoritos';
  private readonly ids = signal<number[]>(this.cargar());

  /** IDs favoritos en orden de agregado. */
  readonly favoritosIds = this.ids.asReadonly();

  /** Lugares favoritos en el orden en que se agregaron. */
  readonly lugaresFavoritos = computed<Lugar[]>(() =>
    this.ids()
      .map((id) => LUGARES.find((lugar) => lugar.id === id))
      .filter((lugar): lugar is Lugar => !!lugar)
  );

  esFavorito(id: number): boolean {
    return this.ids().includes(id);
  }

  alternar(id: number): void {
    if (this.esFavorito(id)) {
      this.quitar(id);
    } else {
      this.ids.update((actuales) => [...actuales, id]);
      this.guardar();
    }
  }

  quitar(id: number): void {
    this.ids.update((actuales) => actuales.filter((favId) => favId !== id));
    this.guardar();
  }

  private cargar(): number[] {
    try {
      const guardados = localStorage.getItem(this.claveFavoritos);
      if (guardados) {
        const datos: unknown = JSON.parse(guardados);
        if (Array.isArray(datos) && datos.every((id) => typeof id === 'number')) {
          return datos;
        }
      }
    } catch {
      // Si localStorage no está disponible o los datos están corruptos, se inicia vacío.
    }
    return [];
  }

  private guardar(): void {
    try {
      localStorage.setItem(this.claveFavoritos, JSON.stringify(this.ids()));
    } catch {
      console.warn('No fue posible guardar los favoritos.');
    }
  }
}
