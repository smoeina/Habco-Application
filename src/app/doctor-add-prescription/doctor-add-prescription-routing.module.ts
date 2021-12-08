import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DoctorAddPrescriptionPage } from './doctor-add-prescription.page';

const routes: Routes = [
  {
    path: '',
    component: DoctorAddPrescriptionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorAddPrescriptionPageRoutingModule {}
