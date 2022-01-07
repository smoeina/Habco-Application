import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DrugstorePrescriptionsPagePage } from './drugstore-prescriptions-page.page';

const routes: Routes = [
  {
    path: '',
    component: DrugstorePrescriptionsPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DrugstorePrescriptionsPagePageRoutingModule {}
