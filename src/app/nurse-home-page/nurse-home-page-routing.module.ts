import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NurseHomePagePage } from './nurse-home-page.page';

const routes: Routes = [
  {
    path: '',
    component: NurseHomePagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NurseHomePagePageRoutingModule {}
