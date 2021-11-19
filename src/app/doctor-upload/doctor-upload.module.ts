import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DoctorUploadPageRoutingModule } from './doctor-upload-routing.module';

import { DoctorUploadPage } from './doctor-upload.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DoctorUploadPageRoutingModule
  ],
  declarations: [DoctorUploadPage]
})
export class DoctorUploadPageModule {}
