import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DrugstoreDrugsPagePageRoutingModule } from './drugstore-drugs-page-routing.module';

import { DrugstoreDrugsPagePage } from './drugstore-drugs-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DrugstoreDrugsPagePageRoutingModule
  ],
  declarations: [DrugstoreDrugsPagePage]
})
export class DrugstoreDrugsPagePageModule {}
