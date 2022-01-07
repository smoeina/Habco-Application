import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminDrugstoresPageRoutingModule } from './admin-drugstores-routing.module';

import { AdminDrugstoresPage } from './admin-drugstores.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminDrugstoresPageRoutingModule
  ],
  declarations: [AdminDrugstoresPage]
})
export class AdminDrugstoresPageModule {}
