import { ErrorControllerService } from './../error-controller.service';
import { ErrorCollector } from '@angular/compiler';
/* eslint-disable @typescript-eslint/naming-convention */
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { range } from 'rxjs';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  @ViewChild('ID') id;
  @ViewChild('email') email;
  @ViewChild('phone') phone;
  idSpan = true;
  emailSpan = true;
  phoneSpan = true;
  userType = 'user';
  step = 'None';
  phone_number = '';
  real_national_number = '';
  constructor(public router: Router,public authService: AuthService,
    public loadingController: LoadingController,public alertController: AlertController,
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




  async registerDoneAlert() {
    const alert = await this.alertController.create({
      header: 'Register Done.',
      message: 'Registered Successfully.',
      buttons: ['OK']
    });

    await alert.present();
  }


  async onClickSubmit() {
    console.log((this.phone.dialCodePrefix+this.phone.country.dialCode + this.phone.phoneNumber).replace(/\s/g, '').replace('+',''));
    this.phone_number = (this.phone.dialCodePrefix+this.phone.country.dialCode + this.phone.phoneNumber).replace(/\s/g, '').replace('+','');
    if (this.step==='None'){
      this.ErrorCont.showErrorMessage('Please Enter User Type');
      return;
    }
    if (this.id.toString().length <10 ){
      this.real_national_number = this.id.value.toString();
      while(this.real_national_number.length <10){
        console.log(this.real_national_number);
        this.real_national_number= '0' + this.real_national_number;
      }
    }
    else{
      this.real_national_number= this.id.value.toString();
      console.log('YA:'+this.real_national_number);
    }

    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    await loading.present();
    console.log(this.real_national_number);
    if (this.idSpan && this.emailSpan &&this.phoneSpan && this.email.length !==0){
      this.authService.register(this.email.value,this.phone_number,this.step,this.real_national_number).toPromise().then(resp => {
        console.log(resp);
        loading.dismiss();
        this.registerDoneAlert();
        this.router.navigate(['login']);

      }).catch(error => {
        // console.log(error);
        loading.dismiss();
        this.ErrorCont.showError(error);
      });
    }
    else{
      this.checkInputValues();
    }

 }
 checkNationalID(){
  if(this.id.value.length===10){
    this.idSpan=true;
  }
  else{
    return this.idSpan=false;
  }
 }

 checkEmail(){
 if(this.email.value.includes('@') && this.email.value.includes('.')){
   this.emailSpan=true;
 }
 else{
   return this.emailSpan=false;
 }
}
checkPhoneNumber(){

   if(this.phone.internationalNumber.includes('+')){
     this.phoneSpan=true;
   }
   else{
     return this.phoneSpan=false;
   }
  }
  clickLoginButton(){
    this.router.navigate(['login']);

  }
  doctorClicked(){
    this.step = 'doctor';
  }
  nurseClicked(){
    this.step = 'nurse';
  }
  userClicked(){
    this.step = 'patient';
  }
  drugStoreClicked(){
    this.step = 'pharmacist';
  }


}
