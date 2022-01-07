import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserDrugstoresPagePageRoutingModule } from './user-drugstores-page-routing.module';

import { UserDrugstoresPagePage } from './user-drugstores-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserDrugstoresPagePageRoutingModule
  ],
  declarations: [UserDrugstoresPagePage]
})
export class UserDrugstoresPagePageModule {}
