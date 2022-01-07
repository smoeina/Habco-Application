import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminSeeInfoPage } from './admin-see-info.page';

const routes: Routes = [
  {
    path: '',
    component: AdminSeeInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminSeeInfoPageRoutingModule {}
