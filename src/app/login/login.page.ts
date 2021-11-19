import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../user.service';
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
  @ViewChild('ID') id;
  @ViewChild('phone') phone;

  idSpan = true;
  phoneSpan = true;

  constructor(public userService: UserService,public router: Router,public authService: AuthService,
 public alertController: AlertController,public loadingController: LoadingController) {
  }


  ngOnInit() {

  }



    async showError(errorMessage) {
    const alert = await this.alertController.create({
      header: 'Error in sending data',
      message: errorMessage.error,
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

  async onClickSubmit() {
     const loading = await this.loadingController.create({
       message: 'Please wait...',
     });
    await loading.present();
    if (this.idSpan &&this.phoneSpan){
      console.log(this.userService.user);
      this.authService.login().toPromise().then(resp => {
        console.log(resp);
        console.log(this.phone.value);
         loading.dismiss();
        this.router.navigate(['sms-verification']);

      }).catch(error => {
         console.log(error);
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
 clickRegisterButton(){
   this.router.navigate(['register']);
 }
}
