import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NurseUploadPagePage } from './nurse-upload-page.page';

const routes: Routes = [
  {
    path: '',
    component: NurseUploadPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NurseUploadPagePageRoutingModule {}
