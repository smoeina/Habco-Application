import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DrugstoreHomePagePage } from './drugstore-home-page.page';

const routes: Routes = [
  {
    path: '',
    component: DrugstoreHomePagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DrugstoreHomePagePageRoutingModule {}
