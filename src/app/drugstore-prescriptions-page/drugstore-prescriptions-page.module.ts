import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DrugstorePrescriptionsPagePageRoutingModule } from './drugstore-prescriptions-page-routing.module';

import { DrugstorePrescriptionsPagePage } from './drugstore-prescriptions-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DrugstorePrescriptionsPagePageRoutingModule
  ],
  declarations: [DrugstorePrescriptionsPagePage]
})
export class DrugstorePrescriptionsPagePageModule {}
