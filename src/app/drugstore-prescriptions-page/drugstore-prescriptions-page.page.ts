/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit,ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ErrorControllerService } from '../error-controller.service';

@Component({
  selector: 'app-drugstore-prescriptions-page',
  templateUrl: './drugstore-prescriptions-page.page.html',
  styleUrls: ['./drugstore-prescriptions-page.page.scss'],
})
export class DrugstorePrescriptionsPagePage implements OnInit {
  app_token = '';
  prescriptions: any;

  constructor(public alertController: AlertController,public http: HttpClient,
    public loadingController: LoadingController,public errorController: ErrorControllerService,
    public router: Router) { }

  ngOnInit() {
  }
  async get_id(){
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    await loading.present();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer '+ this.app_token,
    });
    const options = { headers };
    // http://localhost:8000/habco/pharmacist/{id}/drug

    this.http.get('https://habco.rshayanfar.ir/habco/prescription',options).toPromise().then(resp => {
      this.prescriptions = resp['data'];
      loading.dismiss();

    }).catch(error => {
      loading.dismiss();
      this.errorController.showError(error);
    });

  }
  ionViewWillEnter()
  {
    this.app_token = localStorage.getItem('app-token');
    this.get_id();

  }

  async change_status(pres) {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    const prompt = this.alertController.create({
      header:'Tranmitting prescription',
      message: 'Are you want to change the status of prescription to transmitted?',
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: async data => {
            await loading.present();
            const headers = new HttpHeaders({
              'Content-Type': 'application/json',
              Authorization: 'Bearer '+ this.app_token,
            });
            const options = { headers };
            this.http.put('https://habco.rshayanfar.ir/habco/prescription/'+pres.id,{status:'transmitted'}
            ,options).toPromise().then(response => {
              console.log(response['data']);
              loading.dismiss();
              this.get_id();

            }).catch(error => {
              loading.dismiss();
              this.errorController.showError(error);
            });
          }
        }
      ]
    });
    (await prompt).present();

  }





}
