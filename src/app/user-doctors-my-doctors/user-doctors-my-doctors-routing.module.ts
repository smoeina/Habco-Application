import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserDoctorsMyDoctorsPage } from './user-doctors-my-doctors.page';

const routes: Routes = [
  {
    path: '',
    component: UserDoctorsMyDoctorsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserDoctorsMyDoctorsPageRoutingModule {}
