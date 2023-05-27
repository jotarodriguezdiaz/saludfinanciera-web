import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoalsComponent } from './goals.component';

const routes: Routes = [
  {
    path: '',
    component: GoalsComponent,
    data: {
      title: $localize`Objetivos`
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GoalsRouting {
}
