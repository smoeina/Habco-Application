/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/naming-convention */
import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NurseService } from '../nurse.service';
@Component({
  selector: 'app-nurse-home-page',
  templateUrl: './nurse-home-page.page.html',
  styleUrls: ['./nurse-home-page.page.scss'],
})
export class NurseHomePagePage implements OnInit {
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

  constructor(public router: Router,private http: HttpClient,public nurse_service: NurseService) { }

  edit_button_clicked(){
    this.router.navigate(['nurse-upload-page']);
  }
  logout_clicked(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer '+ this.app_token,
    });
    const options = { headers: headers };
    this.http.delete('http://135.181.65.177/habco/token',options).toPromise().then(resp => {
      localStorage.removeItem('app-token');
      this.router.navigate(['welcome']);

    }).catch(error => {
        console.log('Error');
    });;
  }
  doc_and_cv_status(){

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer '+ this.app_token,
    });
    const options = { headers: headers };
    this.http.get('http://135.181.65.177/habco/user',options).toPromise().then(resp => {
      localStorage.setItem('user_id', resp['data']['id']);

    }).catch(error => {
        console.log('Error');
    });

    if (localStorage.getItem('user_id')){

      this.http.get('http://135.181.65.177/habco/nurse/'+localStorage.getItem('user_id').toString(),options).toPromise().then(resp => {

      this.cv_id = resp['data']['cv_id'];
      this.document_id = resp['data']['document_id'];

      this.http.get('http://135.181.65.177/habco/document/'+this.document_id,options).toPromise().then(rest => {
        this.document_accepted = this.dict[rest['data']['verified']];
       }).catch(error => {
           console.log('Error');
       });
       this.http.get('http://135.181.65.177/habco/document/'+this.cv_id,options).toPromise().then(response => {
         this.cv_accepted = this.dict[response['data']['verified']];
        }).catch(error => {
            console.log('Error');
        });


      }).catch(error => {
          console.log('Error');
      });

    }


  }
  get_patients(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer '+ this.app_token,
    });
    const options = { headers: headers };
    this.http.get('http://135.181.65.177/habco/patient',options).toPromise().then(resp => {
       this.nurse_service.patients_list = resp['data'];
       this.patients_number = this.nurse_service.patients_list.length;
    }).catch(error => {
        console.log('Error');
    });
  }
  get_prescriptions(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer '+ this.app_token,
    });
    const options = { headers: headers };
    this.http.get('http://135.181.65.177/habco/prescription',options).toPromise().then(resp => {
       console.log(resp);
       this.nurse_service.prescriptions_list = resp['data'];
       this.prescriptions_number = this.nurse_service.prescriptions_list.length;
     }).catch(error => {
         console.log('Error');
     });
  }
  ionViewWillEnter() {
    this.app_token = localStorage.getItem('app-token');
    this.doc_and_cv_status();
    this.get_patients();
    this.get_prescriptions();
  }
  patients_clicked(){

    this.router.navigate(['nurse-patients-page']);

  }
  prescriptions_clicked(){
    this.router.navigate(['nurse-prescription-page']);

  }
  ngOnInit(){

  }

}
