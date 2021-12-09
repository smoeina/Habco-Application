import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NurseUploadPagePageRoutingModule } from './nurse-upload-page-routing.module';

import { NurseUploadPagePage } from './nurse-upload-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NurseUploadPagePageRoutingModule
  ],
  declarations: [NurseUploadPagePage]
})
export class NurseUploadPagePageModule {}
