import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NurseAddPrescriptionPagePageRoutingModule } from './nurse-add-prescription-page-routing.module';

import { NurseAddPrescriptionPagePage } from './nurse-add-prescription-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NurseAddPrescriptionPagePageRoutingModule
  ],
  declarations: [NurseAddPrescriptionPagePage]
})
export class NurseAddPrescriptionPagePageModule {}
