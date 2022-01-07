import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminDrugstoresPage } from './admin-drugstores.page';

const routes: Routes = [
  {
    path: '',
    component: AdminDrugstoresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminDrugstoresPageRoutingModule {}
