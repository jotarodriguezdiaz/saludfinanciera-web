import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CorrectMonthComponent } from './correct-month.component';

const routes: Routes = [
  {
    path: '',
    component: CorrectMonthComponent,
    data: {
      title: $localize`Corrección`
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorrectMonthRoutingModule {
}
