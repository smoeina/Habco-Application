import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DrugstoreEditInfoPageRoutingModule } from './drugstore-edit-info-routing.module';

import { DrugstoreEditInfoPage } from './drugstore-edit-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DrugstoreEditInfoPageRoutingModule
  ],
  declarations: [DrugstoreEditInfoPage]
})
export class DrugstoreEditInfoPageModule {}
