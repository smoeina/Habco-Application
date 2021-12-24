import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserPrescriptionsPagePageRoutingModule } from './user-prescriptions-page-routing.module';

import { UserPrescriptionsPagePage } from './user-prescriptions-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserPrescriptionsPagePageRoutingModule
  ],
  declarations: [UserPrescriptionsPagePage]
})
export class UserPrescriptionsPagePageModule {}
