import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DebtsSimulatorComponent } from './debts-simulator.component';

const routes: Routes = [
  {
    path: '',
    component: DebtsSimulatorComponent,
    data: {
      title: $localize`Simulador deudas`
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DebtsSimulatorRoutingModule {
}
