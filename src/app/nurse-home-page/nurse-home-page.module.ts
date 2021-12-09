import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NurseHomePagePageRoutingModule } from './nurse-home-page-routing.module';

import { NurseHomePagePage } from './nurse-home-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NurseHomePagePageRoutingModule
  ],
  declarations: [NurseHomePagePage]
})
export class NurseHomePagePageModule {}
