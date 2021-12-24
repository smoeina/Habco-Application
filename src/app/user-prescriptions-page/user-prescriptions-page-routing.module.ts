import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserPrescriptionsPagePage } from './user-prescriptions-page.page';

const routes: Routes = [
  {
    path: '',
    component: UserPrescriptionsPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserPrescriptionsPagePageRoutingModule {}
