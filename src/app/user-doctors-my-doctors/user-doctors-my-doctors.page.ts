/* eslint-disable quote-props */
/* eslint-disable max-len */
import { ErrorControllerService } from './../error-controller.service';
import { LoadingController, AlertController } from '@ionic/angular';
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-user-doctors-my-doctors',
  templateUrl: './user-doctors-my-doctors.page.html',
  styleUrls: ['./user-doctors-my-doctors.page.scss'],
})
export class UserDoctorsMyDoctorsPage implements OnInit {
  app_token = '';
  my_doctors: any;
  constructor(public alertController: AlertController,public http: HttpClient,
    public loadingController: LoadingController,public errorController: ErrorControllerService) { }

  ngOnInit() {
  }
async get_my_doctors(){
  const loading = await this.loadingController.create({
    message: 'Please wait...',
  });
  await loading.present();
    this.app_token = localStorage.getItem('app-token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer '+ this.app_token,
      'Accept': 'application/json, text/plain',
        'cache-control': 'no-cache',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token, Accept, Authorization, X-Request-With, Access-Control-Request-Method, Access-Control-Request-Headers',
        'Access-Control-Allow-Credentials' : 'true',
        'Access-Control-Allow-Methods' : 'GET, POST, DELETE, PUT, OPTIONS, TRACE, PATCH, CONNECT'});
    const options = { headers };
  this.http.get('https://habco.rshayanfar.ir/habco/patient/doctor',options).toPromise().then(async resp => {
          this.my_doctors = resp['data'];
          await loading.dismiss();
        }).catch(async error => {
          await loading.dismiss();
            this.errorController.showError(error);

        });
}
ionViewWillEnter() {
  this.get_my_doctors();
}
whats_app_clicked(doctor){
  window.open('https://wa.me/'+doctor.user.phone);

}
}
