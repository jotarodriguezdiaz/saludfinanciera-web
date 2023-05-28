import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule, CardModule, FormModule, GridModule, ModalModule, NavModule, ProgressModule, TableModule, TooltipModule } from '@coreui/angular';

import { ConfirmationModule } from '../../shared/components/confirm-modal/confirmation-module.module';
import { IconModule } from '@coreui/icons-angular';
import { NgSelectModule } from '@ng-select/ng-select';
import { CorrectMonthComponent } from './correct-month.component';
import { CorrectMonthRoutingModule } from './correct-month-routing.module';
import { SpinnerModule } from '../../shared/components/spinner/spinner.module';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  declarations: [
    CorrectMonthComponent
  ],
  imports: [
    CoreModule,
    ConfirmationModule,
    CardModule,
    SpinnerModule,
    FormModule,
    GridModule,
    CardModule,
    ModalModule,
    ButtonModule,
    CorrectMonthRoutingModule,
    CommonModule,
    ProgressModule,
    NavModule,
    IconModule,
    CommonModule,
    ProgressModule,
    TableModule,
    TooltipModule,
    NgSelectModule
  ]
})
export class CorrectMonthModule {
}
