import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule, CardModule, FormModule, GridModule, ModalModule } from '@coreui/angular';

import { BoardsManagementComponent } from './boards-management.component';
import { BoardsRoutingModule } from './boards-routing.module';
import { CreateBoardComponent, UpdateBoardComponent } from './components';
import { CoreModule } from 'src/app/core/core.module';
import { SpinnerModule } from 'src/app/shared/components/spinner/spinner.module';
import { ConfirmationModule } from '../../shared/components/confirm-modal/confirmation-module.module';

@NgModule({
  declarations: [
    BoardsManagementComponent,
    CreateBoardComponent,
    UpdateBoardComponent
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
    BoardsRoutingModule,
    CommonModule
  ]
})
export class BoardsModule {
}
