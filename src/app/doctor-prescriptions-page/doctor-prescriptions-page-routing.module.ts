import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DoctorPrescriptionsPagePage } from './doctor-prescriptions-page.page';

const routes: Routes = [
  {
    path: '',
    component: DoctorPrescriptionsPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorPrescriptionsPagePageRoutingModule {}
