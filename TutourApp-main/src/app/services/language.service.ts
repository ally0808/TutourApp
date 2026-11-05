import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private translate = inject(TranslateService);
  private readonly LANG_KEY = 'app_language';

  initLanguage(): void {
    this.translate.addLangs(['es', 'en', 'fr', 'pt', 'ja']);
    
    // 🌐 En versiones recientes setDefaultLang pasa a ser setFallbackLang
    this.translate.setFallbackLang('es');

    const savedLang = localStorage.getItem(this.LANG_KEY) || 'es';
    this.setLanguage(savedLang);
  }

  setLanguage(lang: string): void {
    this.translate.use(lang);
    localStorage.setItem(this.LANG_KEY, lang);
  }

  getCurrentLanguage(): string {
    return localStorage.getItem(this.LANG_KEY) || 'es';
  }
}