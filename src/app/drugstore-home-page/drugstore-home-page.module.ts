import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DrugstoreHomePagePageRoutingModule } from './drugstore-home-page-routing.module';

import { DrugstoreHomePagePage } from './drugstore-home-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DrugstoreHomePagePageRoutingModule
  ],
  declarations: [DrugstoreHomePagePage]
})
export class DrugstoreHomePagePageModule {}
