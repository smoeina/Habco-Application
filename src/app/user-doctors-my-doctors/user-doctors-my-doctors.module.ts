import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserDoctorsMyDoctorsPageRoutingModule } from './user-doctors-my-doctors-routing.module';

import { UserDoctorsMyDoctorsPage } from './user-doctors-my-doctors.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserDoctorsMyDoctorsPageRoutingModule
  ],
  declarations: [UserDoctorsMyDoctorsPage]
})
export class UserDoctorsMyDoctorsPageModule {}
