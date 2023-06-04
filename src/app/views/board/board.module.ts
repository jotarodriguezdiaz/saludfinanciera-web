import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule, CardModule, FormModule, GridModule, ModalModule, NavModule, ProgressModule, TableModule, TooltipModule, WidgetModule } from '@coreui/angular';

import { BoardRoutingModule } from './board-routing.module';
import { ConfirmationModule } from '../../shared/components/confirm-modal/confirmation-module.module';
import { SpinnerModule } from 'src/app/shared/components/spinner/spinner.module';
import { CoreModule } from 'src/app/core/core.module';
import { BoardComponent } from './board.component';
import { CategoriesComponent } from './categories/components/categories.component';
import { CreateCategoryComponent } from './categories/components/create/create-category.component';
import { UpdateBoardComponent } from './categories/components/update/update-category.component';
import { IconModule } from '@coreui/icons-angular';
import { CreateIncomeComponent } from './categories/components/create-income/create-income.component';
import { UpdateIncomeComponent } from './categories/components/update-income/update-income.component';
import { CreateExpenseComponent } from './categories/components/create-expense/create-expense.component';
import { UpdateExpenseComponent } from './categories/components/update-expense/update-expense.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { TagsComponent } from './categories/components/tags/tags.component';
import { ViewCategoriesComponent } from './categories/components/view-categories/view-categories.component';
import { ViewTagsComponent } from './categories/components/view-tags/view-tags.component';
import { ViewPeriodsComponent } from './categories/components/view-periods/view-periods.component';
import { SummaryComponent } from './categories/components/summary/summary.component';
import { CalculateNoteComponent } from './calculate-note/calculate-note.component';

@NgModule({
  declarations: [
    BoardComponent,
    CategoriesComponent,
    CreateCategoryComponent,
    UpdateBoardComponent,
    CreateIncomeComponent,
    UpdateIncomeComponent,
    CreateExpenseComponent,
    UpdateExpenseComponent,
    TagsComponent,
    ViewCategoriesComponent,
    ViewTagsComponent,
    ViewPeriodsComponent,
    SummaryComponent,
    CalculateNoteComponent
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
    BoardRoutingModule,
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
export class BoardModule {
}
