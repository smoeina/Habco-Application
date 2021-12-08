import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserDoctorsPagePageRoutingModule } from './user-doctors-page-routing.module';

import { UserDoctorsPagePage } from './user-doctors-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserDoctorsPagePageRoutingModule
  ],
  declarations: [UserDoctorsPagePage]
})
export class UserDoctorsPagePageModule {}
