import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PatientEditInfoPageRoutingModule } from './patient-edit-info-routing.module';

import { PatientEditInfoPage } from './patient-edit-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PatientEditInfoPageRoutingModule
  ],
  declarations: [PatientEditInfoPage]
})
export class PatientEditInfoPageModule {
}
