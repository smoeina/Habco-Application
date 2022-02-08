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
  @ViewChild('email') email;
  @ViewChild('phone') phone;
  emailSpan = true;
  phoneSpan = true;
  userType = 'user';
  step = 'None';
  phone_number = '';
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
    console.log((this.phone.dialCodePrefix+this.phone.country.dialCode + this.phone.phoneNumber)
    .replace(/\s/g, '').replace('+','').replace('-',''));
    this.phone_number = (this.phone.dialCodePrefix+this.phone.country.dialCode + this.phone.phoneNumber).replace(/\s/g, '').replace('+','');
    if (this.step==='None'){
      this.ErrorCont.showErrorMessage('Please Enter User Type');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    await loading.present();
    if (this.emailSpan &&this.phoneSpan && this.email.length !==0){
      this.authService.register(this.email.value,this.phone_number,this.step).toPromise().then(resp => {
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
