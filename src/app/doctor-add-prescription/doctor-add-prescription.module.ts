import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DoctorAddPrescriptionPageRoutingModule } from './doctor-add-prescription-routing.module';

import { DoctorAddPrescriptionPage } from './doctor-add-prescription.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DoctorAddPrescriptionPageRoutingModule
  ],
  declarations: [DoctorAddPrescriptionPage]
})
export class DoctorAddPrescriptionPageModule {}
