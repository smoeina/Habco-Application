import { ErrorControllerService } from './../error-controller.service';
/* eslint-disable @typescript-eslint/dot-notation */
import { AuthService } from './../auth.service';
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ErrorCollector } from '@angular/compiler';
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

  constructor(public authService: AuthService
    ,public loadingController: LoadingController,public router: Router,public alertController: AlertController
    ,public ErrorController: ErrorControllerService) { }

  ngOnInit() {
  }

  async checkCode(){
     const loading = await this.loadingController.create({
      message: 'Please wait...',
     });
     await loading.present();
     if(this.first_otp.value.length===1 && this.second_otp.value.length===1 &&
        this.third_otp.value.length===1 && this.forth_otp.value.length===1){
        this.authService.sendValidationCode(this.first_otp.value.toString()+ this.second_otp.value.toString()
        + this.third_otp.value.toString()+this.forth_otp.value.toString()).toPromise().then(resp => {
          console.log(resp);
           loading.dismiss();
           console.log(resp['data']['user']);
           localStorage.setItem('user',resp['data']['user']);
           console.log('app-token'+resp['data']['appToken']);
           localStorage.setItem('app-token',resp['data']['appToken']);

           if (resp['data']['user']['role']==='doctor')
           {
            this.router.navigate(['doctor-home-page']);
           }
           if (resp['data']['user']['role']==='patient')
           {
            this.router.navigate(['user-home-page']);
           }
           if (resp['data']['user']['role']==='nurse')
           {
            this.router.navigate(['nurse-home-page']);
           }

         }).catch(error => {
           console.log(error.error);
           loading.dismiss();
           this.ErrorController.showError(error);
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
