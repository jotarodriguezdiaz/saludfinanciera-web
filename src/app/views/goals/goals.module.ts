import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule, CardModule, FormModule, GridModule, ModalModule, ProgressModule, WidgetModule } from '@coreui/angular';

import { ConfirmationModule } from '../../shared/components/confirm-modal/confirmation-module.module';
import { CoreModule } from '../../core/core.module';
import { SpinnerModule } from '../../shared/components/spinner/spinner.module';
import { GoalsComponent } from './goals.component';
import { GoalsRouting } from './goals-routing.module';
import { CreateGoalComponent } from './components/create/create-goal.component';

@NgModule({
  declarations: [
    GoalsComponent,
    CreateGoalComponent
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
    GoalsRouting,
    CommonModule,
    WidgetModule,
    ProgressModule
  ]
})
export class GoalsModule {
}
