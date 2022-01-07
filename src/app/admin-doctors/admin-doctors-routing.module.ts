import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminDoctorsPage } from './admin-doctors.page';

const routes: Routes = [
  {
    path: '',
    component: AdminDoctorsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminDoctorsPageRoutingModule {}
