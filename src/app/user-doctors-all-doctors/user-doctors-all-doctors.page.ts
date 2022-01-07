/* eslint-disable max-len */
import { ErrorControllerService } from './../error-controller.service';
import { LoadingController, AlertController } from '@ionic/angular';
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-doctors-all-doctors',
  templateUrl: './user-doctors-all-doctors.page.html',
  styleUrls: ['./user-doctors-all-doctors.page.scss'],
})
export class UserDoctorsAllDoctorsPage implements OnInit {
  app_token = '';
  doctors_list: any;
  constructor(public alertController: AlertController,public http: HttpClient,
    public loadingController: LoadingController,public errorController: ErrorControllerService) { }
  async get_doctors_list(){
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    await loading.present();
    this.app_token = localStorage.getItem('app-token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer '+ this.app_token,
      Accept: 'application/json, text/plain',
        'cache-control': 'no-cache',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token, Accept, Authorization, X-Request-With, Access-Control-Request-Method, Access-Control-Request-Headers',
        'Access-Control-Allow-Credentials' : 'true',
        'Access-Control-Allow-Methods' : 'GET, POST, DELETE, PUT, OPTIONS, TRACE, PATCH, CONNECT'});
    const options = { headers };
    this.http.get('https://habco.rshayanfar.ir/habco/doctor',options).toPromise().then(async resp => {
      this.doctors_list = resp['data'];
      await loading.dismiss();

    }).catch(async error => {
      await loading.dismiss();
        this.errorController.showError(error);
    });
  }
  ngOnInit() {
  }
  async select_doctor(doctor){
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer '+ this.app_token,
      Accept: 'application/json, text/plain',
        'cache-control': 'no-cache',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token, Accept, Authorization, X-Request-With, Access-Control-Request-Method, Access-Control-Request-Headers',
        'Access-Control-Allow-Credentials' : 'true',
        'Access-Control-Allow-Methods' : 'GET, POST, DELETE, PUT, OPTIONS, TRACE, PATCH, CONNECT'});
    const options = { headers };
      this.alertController.create({
        header: 'Confirm Alert',
        subHeader: 'Select Doctor',
        message: 'Are you sure?Do you want Select '+doctor.lname+' as your Doctor?',
        buttons: [
          {
            text: 'No',
            handler: () => {
            }
          },
          {
            text: 'Yes',
            handler: async () => {
              await loading.present();
              this.http.post('https://habco.rshayanfar.ir/habco/patient/doctor'+doctor.id,{'':''},options).toPromise().then(resp => {

              }).catch(error => {
                  loading.dismiss();
                  this.errorController.showError(error);
              });
            }
          }
        ]
      }).then(res => {
        res.present();
        loading.dismiss();
      });

  }
  ionViewWillEnter() {
    this.get_doctors_list();
  }
}
