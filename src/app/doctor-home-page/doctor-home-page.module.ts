import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DoctorHomePagePageRoutingModule } from './doctor-home-page-routing.module';

import { DoctorHomePagePage } from './doctor-home-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DoctorHomePagePageRoutingModule
  ],
  declarations: [DoctorHomePagePage]
})
export class DoctorHomePagePageModule {}
