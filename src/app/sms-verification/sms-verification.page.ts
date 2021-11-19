import { AuthService } from './../auth.service';
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../user.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sms-verification',
  templateUrl: './sms-verification.page.html',
  styleUrls: ['./sms-verification.page.scss'],
})
export class SmsVerificationPage implements OnInit {
  @ViewChild('otp1') first_otp;
  @ViewChild('otp2') second_otp;
  @ViewChild('otp3') third_otp;
  @ViewChild('otp4') forth_otp;
  OTP: any =  {
    first: '',
    second: '',
    third: '',
    forth: '',

  };

  constructor(public userService: UserService,public authService: AuthService
    ,public loadingController: LoadingController,public router: Router,public alertController: AlertController) { }

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
   async checkCode(){
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    await loading.present();
    if(this.first_otp.value.length===1 && this.second_otp.value.length===1 &&
       this.third_otp.value.length===1 && this.forth_otp.value.length===1){
        this.userService.OTP = this.OTP;
        this.authService.sendValidationCode().toPromise().then(resp => {
          loading.dismiss();
          localStorage.setItem('user',resp);
          this.router.navigate(['informations']);

        }).catch(error => {
          // console.log(error);
          loading.dismiss();
          this.showError(error);
        });
    }
    else{
      await loading.dismiss();
    }
  }
  otpController(event,next,prev, index){


      if(index === 4) {
        this.checkCode();
      }
      if(event.target.value.length < 1 && prev){
        prev.setFocus();
      }
      else if(next && event.target.value.length>0){
        next.setFocus();
      }
      else {
       return 0;
      }
   }
   clickLoginButton(){
     this.router.navigate(['login']);
   }
}
