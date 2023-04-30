import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from './icons/icon-subset';
import { Title } from '@angular/platform-browser';
import { I18nService } from './core/i18n/i18n.service';

@Component({
  selector: 'app-root',
  template: `
    <app-toasts aria-live="polite" aria-atomic="true"></app-toasts>
    <!-- <div>
      <button (click)="changeLanguage('es')">Español</button>
      <button (click)="changeLanguage('en')">English</button>
    </div> -->
    <router-outlet></router-outlet>
  `,
})
export class AppComponent implements OnInit {
  title = 'Salud financiera';

  constructor(
    private router: Router,
    private titleService: Title,
    private iconSetService: IconSetService,
    private i18nService: I18nService
  ) {
    // this.i18nService.loadTranslations('es').subscribe();
    titleService.setTitle(this.title);
    // iconSet singleton
    iconSetService.icons = { ...iconSubset };
  }

  changeLanguage(lang: string): void {
    this.i18nService.setLanguage(lang);
  }

  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
    });
  }
}
