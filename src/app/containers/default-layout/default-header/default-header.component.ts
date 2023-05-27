import { Component, Input, OnInit } from '@angular/core';

import { HeaderComponent } from '@coreui/angular';
import { AuthService } from '../../../auth/auth.service';
import { Router } from '@angular/router';
import { I18nService } from 'src/app/core/i18n/i18n.service';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent implements OnInit {
  @Input() sidebarId: string = "sidebar";

  defaultLanguage!: string;

  constructor(
    private translate: I18nService,
    private authService: AuthService,
    private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.defaultLanguage = this.translate.getLanguage().toUpperCase();
  }

  changeLanguage(language: string) {
    this.defaultLanguage = language;
    this.translate.setLanguage(language.toLowerCase())
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
