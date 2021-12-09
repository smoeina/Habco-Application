import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NursePrescriptionPagePageRoutingModule } from './nurse-prescription-page-routing.module';

import { NursePrescriptionPagePage } from './nurse-prescription-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NursePrescriptionPagePageRoutingModule
  ],
  declarations: [NursePrescriptionPagePage]
})
export class NursePrescriptionPagePageModule {}
