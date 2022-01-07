import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminNursesPageRoutingModule } from './admin-nurses-routing.module';

import { AdminNursesPage } from './admin-nurses.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminNursesPageRoutingModule
  ],
  declarations: [AdminNursesPage]
})
export class AdminNursesPageModule {}
