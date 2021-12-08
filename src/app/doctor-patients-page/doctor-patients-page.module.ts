import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DoctorPatientsPagePageRoutingModule } from './doctor-patients-page-routing.module';

import { DoctorPatientsPagePage } from './doctor-patients-page.page';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DoctorPatientsPagePageRoutingModule
  ],
  declarations: [DoctorPatientsPagePage]
})
export class DoctorPatientsPagePageModule {}
