import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminDoctorsPageRoutingModule } from './admin-doctors-routing.module';

import { AdminDoctorsPage } from './admin-doctors.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminDoctorsPageRoutingModule
  ],
  declarations: [AdminDoctorsPage]
})
export class AdminDoctorsPageModule {}
