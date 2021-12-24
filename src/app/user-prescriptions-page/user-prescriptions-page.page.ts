import { LoadingController } from '@ionic/angular';
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-user-prescriptions-page',
  templateUrl: './user-prescriptions-page.page.html',
  styleUrls: ['./user-prescriptions-page.page.scss'],
})
export class UserPrescriptionsPagePage implements OnInit {
  app_token = '';
  prescriptions: any;
  instructions: any;

  constructor(public http: HttpClient,public loadingController: LoadingController) { }

  ngOnInit() {
  }
  async get_data(){
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    await loading.present();
    this.app_token = localStorage.getItem('app-token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept:'application/json',
      Authorization: 'Bearer '+ this.app_token,
    });
    const options = { headers };
    this.http.get('https://habco.rshayanfar.ir/habco/prescription',options).toPromise().then(async resp => {
       this.prescriptions = resp['data'];
       await loading.dismiss();

    }).catch(async error => {
        console.log('Error');
        console.log(error);
        await loading.dismiss();
    });
  //   this.http.get('https://habco.rshayanfar.ir/habco/instruction',options).toPromise().then(async resp => {
  //     this.prescriptions = resp['data'];
  //     await loading.dismiss();

  //  }).catch(async error => {
  //      console.log('Error');
  //      console.log(error);
  //      await loading.dismiss();

  //  });
  }
  ionViewWillEnter() {
    this.get_data();
  }
}
