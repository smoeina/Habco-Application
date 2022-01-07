import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DrugstoreDrugsPagePage } from './drugstore-drugs-page.page';

const routes: Routes = [
  {
    path: '',
    component: DrugstoreDrugsPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DrugstoreDrugsPagePageRoutingModule {}
