import { LoadingController } from '@ionic/angular';
import { ErrorControllerService } from './../error-controller.service';
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable object-shorthand */
import { DoctorServiceService } from './../doctor-service.service';
/* eslint-disable @typescript-eslint/naming-convention */
import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-doctor-home-page',
  templateUrl: './doctor-home-page.page.html',
  styleUrls: ['./doctor-home-page.page.scss'],
})
export class DoctorHomePagePage implements OnInit {
 // eslint-disable-next-line quote-props
 dict = {'true':true,'false':false,'':false,1:true,0:false};
 // eslint-disable-next-line @typescript-eslint/naming-convention
 profile_is_complete = this.dict[localStorage.getItem('profile_completed')];
 cv_id: any;
 document_id: any;
 cv_accepted = false;
 document_accepted = false;
 app_token = '';
 patients_number = 0;
 prescriptions_number = 0;

  constructor(public router: Router,private http: HttpClient,
    public doctor_service: DoctorServiceService,public ErrorCont: ErrorControllerService) { }

  edit_button_clicked(){
    this.router.navigate(['doctor-upload']);
  }
  async logout_clicked(){

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer '+ this.app_token,
    });
    const options = { headers: headers };
    this.http.delete('https://habco.rshayanfar.ir/habco/token',options).toPromise().then(resp => {
      localStorage.removeItem('app-token');
      this.router.navigate(['welcome']);

    }).catch(error => {
      this.ErrorCont.showError(error);
    });
  }
  async doc_and_cv_status(){

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer '+ this.app_token,
    });
    const options = { headers: headers };
    this.http.get('https://habco.rshayanfar.ir/habco/user',options).toPromise().then(resp => {
      localStorage.setItem('user_id', resp['data']['id']);

    }).catch(error => {
      this.ErrorCont.showError(error);
    });

    if (localStorage.getItem('user_id')){

      this.http.get('https://habco.rshayanfar.ir/habco/doctor/'+
      localStorage.getItem('user_id').toString(),options).toPromise().then(resp => {

      this.cv_id = resp['data']['cv_id'];
      this.document_id = resp['data']['document_id'];

      this.http.get('https://habco.rshayanfar.ir/habco/document/'+this.document_id,options).toPromise().then(rest => {
        this.document_accepted = this.dict[rest['data']['verified']];
       }).catch(error => {

        this.ErrorCont.showError(error);
       });
       this.http.get('https://habco.rshayanfar.ir/habco/document/'+this.cv_id,options).toPromise().then(response => {
         this.cv_accepted = this.dict[response['data']['verified']];
        }).catch(error => {
          this.ErrorCont.showError(error);
        });


      }).catch(error => {
        this.ErrorCont.showError(error);
      });

    }


  }
  async get_patients(){

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer '+ this.app_token,
    });
    const options = { headers: headers };
    this.http.get('https://habco.rshayanfar.ir/habco/patient',options).toPromise().then(resp => {
      this.doctor_service.patients_list = resp['data'];
       this.patients_number = this.doctor_service.patients_list.length;
    }).catch(error => {
        this.ErrorCont.showError(error);

    });
  }
  async get_prescriptions(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer '+ this.app_token,
    });
    const options = { headers: headers };
    this.http.get('https://habco.rshayanfar.ir/habco/prescription',options).toPromise().then(resp => {
       console.log(resp);

       this.doctor_service.prescriptions_list = resp['data'];
       this.prescriptions_number = this.doctor_service.prescriptions_list.length;
     }).catch(error => {
        this.ErrorCont.showError(error);

     });
  }
  ionViewWillEnter() {
    this.app_token = localStorage.getItem('app-token');
    this.doc_and_cv_status();
    this.get_patients();
    this.get_prescriptions();
  }
  patients_clicked(){

    this.router.navigate(['doctor-patients-page']);

  }
  prescriptions_clicked(){
    this.router.navigate(['doctor-prescriptions-page']);

  }
  ngOnInit(){

  }
}
