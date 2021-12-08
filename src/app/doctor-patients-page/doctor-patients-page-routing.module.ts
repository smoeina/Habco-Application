import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DoctorPatientsPagePage } from './doctor-patients-page.page';

const routes: Routes = [
  {
    path: '',
    component: DoctorPatientsPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorPatientsPagePageRoutingModule {}
