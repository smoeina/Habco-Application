import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserDoctorsPagePage } from './user-doctors-page.page';

const routes: Routes = [
  {
    path: '',
    component: UserDoctorsPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserDoctorsPagePageRoutingModule {}
