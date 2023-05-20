import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationModalComponent } from './confirmation-modal.component';
import { SharedModule } from '@coreui/angular';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
    declarations: [
        ConfirmationModalComponent
    ],
    exports: [
        ConfirmationModalComponent
    ],
    imports: [
        CommonModule,
        CoreModule
    ]
})
export class ConfirmationModule { }