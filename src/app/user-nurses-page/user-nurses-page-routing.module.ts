import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserNursesPagePage } from './user-nurses-page.page';

const routes: Routes = [
  {
    path: '',
    component: UserNursesPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserNursesPagePageRoutingModule {}
