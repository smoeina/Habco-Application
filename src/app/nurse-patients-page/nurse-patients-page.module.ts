import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NursePatientsPagePageRoutingModule } from './nurse-patients-page-routing.module';

import { NursePatientsPagePage } from './nurse-patients-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NursePatientsPagePageRoutingModule
  ],
  declarations: [NursePatientsPagePage]
})
export class NursePatientsPagePageModule {}
