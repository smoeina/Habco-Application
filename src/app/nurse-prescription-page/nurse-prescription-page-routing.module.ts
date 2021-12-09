import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NursePrescriptionPagePage } from './nurse-prescription-page.page';

const routes: Routes = [
  {
    path: '',
    component: NursePrescriptionPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NursePrescriptionPagePageRoutingModule {}
