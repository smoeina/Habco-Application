/* eslint-disable @typescript-eslint/dot-notation */
import { ErrorControllerService } from './../error-controller.service';
/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-user-nurses-page',
  templateUrl: './user-nurses-page.page.html',
  styleUrls: ['./user-nurses-page.page.scss'],
})
export class UserNursesPagePage implements OnInit {

  app_token = '';
  nurses_list: any;
  my_nurses: any;
  have_my_nurse = false;
  have_of_nurses = false;
    constructor(public router: Router,private http: HttpClient,
      public errorController: ErrorControllerService,public alertController: AlertController) { }
    ngOnInit() {
      this.app_token = localStorage.getItem('app-token');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept':'application/json',
        Authorization: 'Bearer '+ this.app_token,
      });
      const options = { headers };
      this.http.get('https://habco.rshayanfar.ir/habco/nurse',options).toPromise().then(resp => {
        console.log(resp);
        this.nurses_list = resp['data'];
        if (this.nurses_list.length>0){
          this.have_of_nurses = true;
        }
        console.log(this.nurses_list);
      }).catch(error => {
          console.log('Error');
          this.errorController.showError(error);
      });
      this.http.get('https://habco.rshayanfar.ir/habco/patient/nurse',options).toPromise().then(resp => {
        console.log(resp);
        this.my_nurses = resp['data'];
        if (this.my_nurses.length>0){
          this.have_my_nurse = true;
        }
      }).catch(error => {
          console.log('Error');
          this.errorController.showError(error);
      });

    }
    select_nurse(nurse){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer '+ this.app_token,
      });
      const options = { headers };
        console.log(this.app_token);
        this.alertController.create({
          header: 'Confirm Alert',
          subHeader: 'Select Doctor',
          message: 'Are you sure? you want Select '+nurse.lname+' as your doctor?',
          buttons: [
            {
              text: 'No',
              handler: () => {
                console.log('I care about humanity');
              }
            },
            {
              text: 'Yes',
              handler: () => {
                this.http.post('https://habco.rshayanfar.ir/habco/patient/nurse/'+nurse.id,{},options).toPromise().then(resp => {
                  console.log(resp);
                  this.http.get('https://habco.rshayanfar.ir/habco/patient/nurse',options).toPromise().then(response => {
                  console.log(response);
                  this.my_nurses = response['data'];

                }).catch(error => {
                    console.log('Error');
                    this.errorController.showError(error);
                });

                }).catch(error => {
                    console.log('Error');
                    this.errorController.showError(error);
                });
              }
            }
          ]
        }).then(res => {
          res.present();
        });

    }

    whats_app_clicked(nurse){
      window.open('https://wa.me/'+nurse.user.phone);

    }

}
