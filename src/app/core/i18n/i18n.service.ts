import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  private translations: { [key: string]: string } = {};
  private loadedTranslations = new ReplaySubject<void>(1);
  private currentLanguage!: string;
  private defaultLanguage!: string;

  constructor(private http: HttpClient) {
    this.defaultLanguage = 'es';
  }

  loadTranslations(): Observable<void> {    
    if (!this.currentLanguage) {
      const savedLanguage = localStorage.getItem('language');
      this.currentLanguage = savedLanguage || this.defaultLanguage;
    }

    return new Observable((observer) => {
      this.http.get(`assets/i18n/${this.currentLanguage}.json`).subscribe((data: any) => {
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
    this.currentLanguage = lang;

    this.loadTranslations().subscribe(() => {
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