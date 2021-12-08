import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DoctorPrescriptionsPagePageRoutingModule } from './doctor-prescriptions-page-routing.module';

import { DoctorPrescriptionsPagePage } from './doctor-prescriptions-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DoctorPrescriptionsPagePageRoutingModule
  ],
  declarations: [DoctorPrescriptionsPagePage]
})
export class DoctorPrescriptionsPagePageModule {}
