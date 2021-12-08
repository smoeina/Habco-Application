import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserNursesPagePageRoutingModule } from './user-nurses-page-routing.module';

import { UserNursesPagePage } from './user-nurses-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserNursesPagePageRoutingModule
  ],
  declarations: [UserNursesPagePage]
})
export class UserNursesPagePageModule {}
