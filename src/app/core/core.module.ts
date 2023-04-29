import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VendorModule } from './vendor.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    VendorModule,
    HttpClientModule
  ],
  declarations: [
    // AppPaginationComponent,
    // ConfirmLeaveComponent,
    // ...PIPES,
    // ...DIRECTIVES    
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    VendorModule,
    HttpClientModule
    // ...PIPES,
    // ...DIRECTIVES,    
  ],
  // providers: [...PIPES]
})
export class CoreModule { }
