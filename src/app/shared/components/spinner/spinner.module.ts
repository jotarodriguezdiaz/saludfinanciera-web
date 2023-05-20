import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner.component';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
    imports: [
        CoreModule,
        CommonModule,
    ],
    declarations: [
        SpinnerComponent
    ],
    exports: [
        SpinnerComponent
    ]
})
export class SpinnerModule { }