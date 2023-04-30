import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  private translations: { [key: string]: string } = {};
  private loadedTranslations = new ReplaySubject<void>(1);
  private currentLanguage: string;

  constructor(private http: HttpClient) {
    const savedLanguage = localStorage.getItem('language');
    this.currentLanguage = savedLanguage || 'es';
    // TODO: Pendiente cachear el lenguaje preferido por el usuario.
    // Si uso la siguiente línea tengo un problema proque se pide dos veces y no funciona.
    // this.loadTranslations(this.currentLanguage).subscribe();
  }

  loadTranslations(lang: string): Observable<void> {
    return new Observable((observer) => {
      this.http.get(`assets/i18n/${lang}.json`).subscribe((data: any) => {
        this.translations = data;
        this.loadedTranslations.next();
        observer.next();
        observer.complete();
      }, (error) => {
        observer.error(error);
      });
    });
  }

  setLanguage(lang: string): void {
    this.loadTranslations(lang).subscribe(() => {
      this.currentLanguage = lang;
      localStorage.setItem('language', lang);
      this.loadedTranslations.next();
    });
  }

  getLanguage(): string {
    return this.currentLanguage;
  }

  translationsLoaded(): Observable<void> {
    return this.loadedTranslations.asObservable();
  }

  translate(key: string): string {
    return this.translations[key] || key;
  }
}