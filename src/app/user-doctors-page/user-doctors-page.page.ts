import { ErrorControllerService } from './../error-controller.service';
/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-user-doctors-page',
  templateUrl: './user-doctors-page.page.html',
  styleUrls: ['./user-doctors-page.page.scss'],
})
export class UserDoctorsPagePage implements OnInit {
  app_token = '';
  doctors_list: any;
  my_doctors: any;
    constructor(public router: Router,private http: HttpClient,
      public errorController: ErrorControllerService,public alertController: AlertController) { }
    ngOnInit() {
      this.app_token = localStorage.getItem('app-token');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer '+ this.app_token,
      });
      const options = { headers: headers };
      this.http.get('http://135.181.65.177/habco/doctor',options).toPromise().then(resp => {
        console.log(resp);
        this.doctors_list = resp['data'];
        console.log(this.doctors_list);
      }).catch(error => {
          console.log('Error');
          this.errorController.showError(error);
      });
      this.http.get('http://135.181.65.177/habco/patient/doctor/',options).toPromise().then(resp => {
        console.log(resp);
        this.my_doctors = resp['data'];

      }).catch(error => {
          console.log('Error');
          this.errorController.showError(error);
      });

    }
    select_doctor(doctor){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer '+ this.app_token,
      });
      const options = { headers: headers };
        console.log(this.app_token);
        this.alertController.create({
          header: 'Confirm Alert',
          subHeader: 'Select Doctor',
          message: 'Are you sure? you want Select '+doctor.lname+' as your doctor?',
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
                this.http.post('http://135.181.65.177/habco/patient/doctor/'+doctor.id,{},options).toPromise().then(resp => {
                  console.log(resp);
                  this.http.get('http://135.181.65.177/habco/patient/doctor/',options).toPromise().then(resp => {
                  console.log(resp);
                  this.my_doctors = resp['data'];

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

    whats_app_clicked(doctor){
      window.open('https://wa.me/'+doctor.user.phone);

    }


    }

