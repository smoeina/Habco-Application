import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SmsVerificationPageRoutingModule } from './sms-verification-routing.module';

import { SmsVerificationPage } from './sms-verification.page';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SmsVerificationPageRoutingModule,
  ],
  declarations: [SmsVerificationPage]
})
export class SmsVerificationPageModule {}
