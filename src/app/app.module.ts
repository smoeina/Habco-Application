import { PatientEditInfoPageModule } from './patient-edit-info/patient-edit-info.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, LoadingController } from '@ionic/angular';
import { AuthService } from './auth.service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { IonIntlTelInputModule } from 'ion-intl-tel-input';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP } from '@ionic-native/http/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [FormsModule,BrowserModule,HttpClientModule ,IonicModule.forRoot(),
     AppRoutingModule,IonIntlTelInputModule,FormsModule,
     ReactiveFormsModule,PatientEditInfoPageModule],
  providers: [HttpClientModule,HTTP,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {

  constructor(){

  }
//   login() {
//     this.authService.login().toPromise().then(resp => {
//     	if(resp) {
//         	// eslint-disable-next-line @typescript-eslint/dot-notation
//         	localStorage.setItem('user' , resp['accessToken']);
//         }
//     }).catch(error => {
//     	console.log(error);
//     });
// }




}
