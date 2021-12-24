import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserDoctorsAllDoctorsPage } from './user-doctors-all-doctors.page';

const routes: Routes = [
  {
    path: '',
    component: UserDoctorsAllDoctorsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserDoctorsAllDoctorsPageRoutingModule {}
