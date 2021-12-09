import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NursePatientsPagePage } from './nurse-patients-page.page';

const routes: Routes = [
  {
    path: '',
    component: NursePatientsPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NursePatientsPagePageRoutingModule {}
