/* eslint-disable quote-props */
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{


  covid ='';
  respiratory='';
  infectional='';
  imuloical='';
  diabetes='';
  staff='';
  infectionalArea='';
  pet='';
  cardio='';
  cancer='';
  constructor(public authService: AuthService,
    public router: Router,
    public loadingController: LoadingController,
    public alertController: AlertController) {
  }

  async showError(errorMessage) {
    const alert = await this.alertController.create({
      header: 'Error in sending data',
      message: errorMessage.error,
      buttons: ['OK']
    });

    await alert.present();
  }

  yesOrNo(d){
    if(d===true){
      return 'Yes';
    }
    if(d===false){
      return 'No';
    }
    return '';
  }


  async getHabco(){
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
   await loading.present();
   this.authService.getHabcoCode().toPromise().then(resp => {

    this.authService.habcoCode = resp['habcoCode'].toString();
    this.covid = this.yesOrNo(resp['covid']);
    this.respiratory = this.yesOrNo(resp['respiratory']);
    this.infectional = this.yesOrNo(resp['infectional']);
    this.imuloical = this.yesOrNo(resp['imuloical']);
    this.diabetes = this.yesOrNo(resp['diabetes']);
    this.staff = this.yesOrNo(resp['staff']);
    this.infectionalArea = this.yesOrNo(resp['infectional_area']);
    this.pet = this.yesOrNo(resp['pet']);
    this.cardio = this.yesOrNo(resp['cardio']);
    this.cancer = this.yesOrNo(resp['cancer'])
    console.log(resp);
     loading.dismiss();



  }).catch(error => {
     console.log(error);
     loading.dismiss();
    this.showError(error);
  });;
  }
  editInformations(){
    this.router.navigate(['informations']);
  }
  ngOnInit(){
    this.getHabco();
  }


}
