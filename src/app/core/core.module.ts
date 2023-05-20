import { APP_INITIALIZER, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VendorModule } from './vendor.module';
import { HttpClientModule } from '@angular/common/http';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { I18nService } from './i18n/i18n.service';
import { TranslatePipe } from './i18n/translate.pipe';

export function loadTranslationsFactory(i18nService: I18nService) {
  return () => i18nService.loadTranslations('es').toPromise();
}

@NgModule({
  declarations: [
    TranslatePipe
    // ToastsContainerComponent
    // AppPaginationComponent,
    // ConfirmLeaveComponent,
    // ...PIPES,
    // ...DIRECTIVES   
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    VendorModule,
    HttpClientModule,
    NgbToastModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    VendorModule,
    HttpClientModule,
    TranslatePipe
    // NgbPaginationModule
    // ...PIPES,
    // ...DIRECTIVES,    
  ],
  providers: [
    // I18nService
    {
      provide: APP_INITIALIZER,
      useFactory: loadTranslationsFactory,
      deps: [I18nService],
      multi: true
    }
    // ...PIPES
  ]
})
export class CoreModule {
  // constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
  //   if (parentModule) {
  //     throw new Error(
  //       'CoreModule is already loaded. Import it in the AppModule only.'
  //     );
  //   }
  // }

  // static forRoot() {
  //   return {
  //     ngModule: CoreModule,
  //     providers: [I18nService]
  //   };
  // }
}
