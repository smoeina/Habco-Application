import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminSeeInfoPageRoutingModule } from './admin-see-info-routing.module';

import { AdminSeeInfoPage } from './admin-see-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminSeeInfoPageRoutingModule
  ],
  declarations: [AdminSeeInfoPage]
})
export class AdminSeeInfoPageModule {}
