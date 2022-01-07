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
  selector: 'app-drugstore-drugs-page',
  templateUrl: './drugstore-drugs-page.page.html',
  styleUrls: ['./drugstore-drugs-page.page.scss'],
})
export class DrugstoreDrugsPagePage implements OnInit {
  app_token = '';
  my_id: any;
  drugs: any;
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

    this.http.get('https://habco.rshayanfar.ir/habco/user',options).toPromise().then(resp => {
      this.my_id = resp['data'].id;
      console.log(this.my_id);


      this.http.get('https://habco.rshayanfar.ir/habco/pharmacist/'+this.my_id+'/drug',options).toPromise().then(response => {
        console.log(response['data']);
        this.drugs = response['data'];
        loading.dismiss();

      }).catch(error => {
        loading.dismiss();
        this.errorController.showError(error);
      });

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
  async showPrompt() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    const prompt = this.alertController.create({
      header:'Add a Drug',
      message: 'Here You Can Add A Drug to Database',
      inputs: [
        {
          name: 'Name of Drug',
          placeholder: 'Acetaminophen',

        },{
          name: 'Amount',
          placeholder: '0',
          type:'number',
          min:1
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Add',
          handler: async data => {
            await loading.present();

            const headers = new HttpHeaders({
              'Content-Type': 'application/json',
              Authorization: 'Bearer '+ this.app_token,
            });
            const options = { headers };
            console.log(data);
            this.http.post('https://habco.rshayanfar.ir/habco/drug',{'name':data['Name of Drug'],count:+data['Amount']}
            ,options).toPromise().then(response => {
              console.log(response['data']);
              this.drugs = response['data'];
              this.http.get('https://habco.rshayanfar.ir/habco/pharmacist/'+this.my_id+'/drug',options).toPromise().then(response => {
                loading.dismiss();
         console.log(response['data']);
          this.drugs = response['data'];
      }).catch(error => {
        loading.dismiss();
        this.errorController.showError(error);
      });
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

  async edit_amount(drug) {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    const prompt = this.alertController.create({
      header:'Edit '+drug.name,
      message: 'Here You Can Edit Amount of Drug',
      inputs: [{
          name: 'Amount',
          placeholder: '0',
          type:'number',
          min:0
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Edit',
          handler: async data => {
            await loading.present();

            const headers = new HttpHeaders({
              'Content-Type': 'application/json',
              Authorization: 'Bearer '+ this.app_token,
            });
            const options = { headers };
            console.log(drug);
            this.http.put('https://habco.rshayanfar.ir/habco/drug/'+drug.id,{count:+data['Amount']}
            ,options).toPromise().then(response => {
              console.log(response['data']);
              this.drugs = response['data'];
              this.http.get('https://habco.rshayanfar.ir/habco/pharmacist/'+this.my_id+'/drug',options).toPromise().then(resp => {
                console.log(resp['data']);
                this.drugs = resp['data'];
                loading.dismiss();
      }).catch(error => {
        loading.dismiss();

        this.errorController.showError(error);
      });
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
