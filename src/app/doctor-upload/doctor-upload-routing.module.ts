import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DoctorUploadPage } from './doctor-upload.page';

const routes: Routes = [
  {
    path: '',
    component: DoctorUploadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorUploadPageRoutingModule {}
