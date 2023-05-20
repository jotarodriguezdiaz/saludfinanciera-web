import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardsManagementComponent } from './boards-management.component';

const routes: Routes = [
  {
    path: '',
    component: BoardsManagementComponent,
    data: {
      title: $localize`Tableros`
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoardsRoutingModule {
}
