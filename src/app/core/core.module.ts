import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VendorModule } from './vendor.module';
import { HttpClientModule } from '@angular/common/http';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastsContainer } from './toast/toasts-container.component';

@NgModule({
  declarations: [
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
    // NgbPaginationModule
    // ...PIPES,
    // ...DIRECTIVES,    
  ],
  // providers: [...PIPES]
})
export class CoreModule { }
