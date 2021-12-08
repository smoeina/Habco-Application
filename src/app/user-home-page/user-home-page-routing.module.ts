import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserHomePagePage } from './user-home-page.page';

const routes: Routes = [
  {
    path: '',
    component: UserHomePagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserHomePagePageRoutingModule {}
