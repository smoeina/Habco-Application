import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NurseAddPrescriptionPagePage } from './nurse-add-prescription-page.page';

const routes: Routes = [
  {
    path: '',
    component: NurseAddPrescriptionPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NurseAddPrescriptionPagePageRoutingModule {}
