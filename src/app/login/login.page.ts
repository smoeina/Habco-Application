import { ErrorControllerService } from './../error-controller.service';
import { ErrorCollector } from '@angular/compiler';
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild('ID') nationalNumber;
  @ViewChild('phone') phone;

  idSpan = true;
  phoneSpan = true;
  phone_number = '';
  realNationalNumber = '';

  constructor(public router: Router,public authService: AuthService,
 public alertController: AlertController,public loadingController: LoadingController,
 public ErrorCont: ErrorControllerService) {
  }


  ngOnInit() {

  }


  async checkInputValues() {
    const alert = await this.alertController.create({
      header: 'Error in entered values',
      message: 'Please check entered values and try again',
      buttons: ['OK']
    });

    await alert.present();
  }

  async onClickSubmit() {
     const loading = await this.loadingController.create({
       message: 'Please wait...',
     });
    await loading.present();
    if (this.idSpan &&this.phoneSpan){
      if (this.nationalNumber.value.toString().length <10){
        this.realNationalNumber= '0' + this.nationalNumber.value.toString();
        while(this.realNationalNumber.length<10){
          this.realNationalNumber= '0' + this.realNationalNumber.toString();
        }
        console.log(this.realNationalNumber);
      }
      else{
        this.realNationalNumber= this.nationalNumber.value.toString();
        console.log('YA:'+this.realNationalNumber);
      }
      this.phone_number = (this.phone.dialCodePrefix+this.phone.country.dialCode +
         this.phone.phoneNumber).replace(/\s/g, '').replace('+','');
      this.authService.login(this.realNationalNumber,this.phone_number).toPromise().then(resp => {
        console.log(resp);
        console.log(this.phone.value);
        this.authService.otp_token = resp['data'].loginToken;
        localStorage.setItem('opt_token',resp['data'].loginToken);
        console.log(resp['data'].loginToken);
        loading.dismiss();
        this.router.navigate(['sms-verification']);

      }).catch(error => {
         console.log(error);
         loading.dismiss();
        this.ErrorCont.showError(error);
      });
    }
    else{
      this.checkInputValues();
    }

 }
 checkNationalID(){
   console.log(this.nationalNumber.value);
  if(this.nationalNumber.value.length===10){
    this.idSpan=true;
  }
  else{
    return this.idSpan=false;
  }
 }
 clickRegisterButton(){
   this.router.navigate(['register']);
 }
}
