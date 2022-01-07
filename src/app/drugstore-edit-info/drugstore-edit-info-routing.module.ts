import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DrugstoreEditInfoPage } from './drugstore-edit-info.page';

const routes: Routes = [
  {
    path: '',
    component: DrugstoreEditInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DrugstoreEditInfoPageRoutingModule {}
