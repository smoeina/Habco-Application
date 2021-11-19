import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SmsVerificationPage } from './sms-verification.page';

const routes: Routes = [
  {
    path: '',
    component: SmsVerificationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SmsVerificationPageRoutingModule {}
