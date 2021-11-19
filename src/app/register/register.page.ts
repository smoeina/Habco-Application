/* eslint-disable @typescript-eslint/naming-convention */
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  @ViewChild('ID') id;
  @ViewChild('email') email;
  @ViewChild('phone') phone;
  @ViewChild('type') type;

  idSpan = true;
  emailSpan = true;
  phoneSpan = true;
  userType = 'user';
  step = 'None';
  constructor(public userService: UserService,public router: Router,public authService: AuthService,
    public loadingController: LoadingController,public alertController: AlertController) {
  }


  ngOnInit() {

  }



    async showError(errorMessage) {
    const alert = await this.alertController.create({
      header: 'Error in sending data',
      message: 'Please check you internet connection and try again later.',
      buttons: ['OK']
    });

    await alert.present();
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


  async onClickSubmit(data) {
    if (this.step==='None'){
      this.showError('Please Enter User Type');
    }
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    await loading.present();
    console.log(this.authService.userService.user.phone);
    if (this.idSpan && this.emailSpan &&this.phoneSpan && this.email.length !==0){
      console.log({email:this.userService.user.email,phone
      :this.userService.user.phone,national_number:this.userService.user.national_number,role:this.userService.user.type});
      this.authService.register(this.userService.user.email,this.userService.user.phone
        ,this.userService.user.type,this.userService.user.national_number).toPromise().then(resp => {
        console.log(resp);
        console.log(this.phone);
        loading.dismiss();
        this.registerDoneAlert();
        this.router.navigate(['login']);

      }).catch(error => {
        // console.log(error);
        loading.dismiss();
        this.showError(error);
      });
    }
    else{
      this.checkInputValues();
    }

 }
 checkNationalID(){
   console.log(this.id.value);
  if(this.id.value.length===10){
    this.idSpan=true;
  }
  else{
    return this.idSpan=false;
  }
 }

 checkEmail(){
  console.log(this.email.value);
 if(this.email.value.includes('@') && this.email.value.includes('.')){
   this.emailSpan=true;
 }
 else{
   return this.emailSpan=false;
 }
}
checkPhoneNumber(){

   if(this.phone.value.internationalNumber.includes('+')){
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
    this.userService.user.type = 'doctor';
  }
  nurseClicked(){
    this.step = 'nurse';
    this.userService.user.type = 'nurse';
  }
  userClicked(){
    this.step = 'patient';
    this.userService.user.type = 'patient';
  }
  drugStoreClicked(){
    this.step = 'pharmacist';
    this.userService.user.type = 'pharmacist';
  }


}
