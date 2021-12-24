import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserDoctorsAllDoctorsPageRoutingModule } from './user-doctors-all-doctors-routing.module';

import { UserDoctorsAllDoctorsPage } from './user-doctors-all-doctors.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserDoctorsAllDoctorsPageRoutingModule
  ],
  declarations: [UserDoctorsAllDoctorsPage]
})
export class UserDoctorsAllDoctorsPageModule {}
