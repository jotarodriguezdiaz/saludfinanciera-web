import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule, CardModule, FormModule, GridModule, ModalModule, ProgressModule, TableModule, TooltipModule, WidgetModule } from '@coreui/angular';

import { ConfirmationModule } from '../../shared/components/confirm-modal/confirmation-module.module';
import { CoreModule } from '../../core/core.module';
import { SpinnerModule } from '../../shared/components/spinner/spinner.module';

import { DebtsSimulatorRoutingModule } from './debts-simulator-routing.module';
import { DebtsSimulatorComponent } from './debts-simulator.component';
import { ChartjsModule } from '@coreui/angular-chartjs';

@NgModule({
  declarations: [
    DebtsSimulatorComponent
  ],
  imports: [
    ConfirmationModule,
    CardModule,
    SpinnerModule,
    FormModule,
    GridModule,
    CoreModule,
    ModalModule,
    ButtonModule,
    DebtsSimulatorRoutingModule,
    CommonModule,
    WidgetModule,
    ProgressModule,
    TableModule,
    TooltipModule,
    ChartjsModule
  ]
})
export class DebtsSimulator {
}
