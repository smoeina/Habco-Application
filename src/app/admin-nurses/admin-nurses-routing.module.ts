import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminNursesPage } from './admin-nurses.page';

const routes: Routes = [
  {
    path: '',
    component: AdminNursesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminNursesPageRoutingModule {}
