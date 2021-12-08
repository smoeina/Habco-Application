import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatientEditInfoPage } from './patient-edit-info.page';

const routes: Routes = [
  {
    path: '',
    component: PatientEditInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientEditInfoPageRoutingModule {}
