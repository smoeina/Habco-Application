/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorControllerService } from '../error-controller.service';

@Component({
  selector: 'app-drugstore-home-page',
  templateUrl: './drugstore-home-page.page.html',
  styleUrls: ['./drugstore-home-page.page.scss'],
})
export class DrugstoreHomePagePage implements OnInit {
// eslint-disable-next-line quote-props
dict = {'true':true,'false':false,'':false,1:true,0:false};
// eslint-disable-next-line @typescript-eslint/naming-convention
cv_id: any;
document_id: any;
cv_accepted = false;
app_token = '';
patients_number = 0;
prescriptions_number = 0;

 constructor(public router: Router,private http: HttpClient,public ErrorCont: ErrorControllerService) { }

 edit_button_clicked(){
   this.router.navigate(['drugstore-edit-info']);
 }
 async logout_clicked(){

   const headers = new HttpHeaders({
     'Content-Type': 'application/json',
     Authorization: 'Bearer '+ this.app_token,
   });
   const options = { headers };
   this.http.delete('https://habco.rshayanfar.ir/habco/token',options).toPromise().then(resp => {
     localStorage.removeItem('app-token');
     this.router.navigate(['welcome']);

   }).catch(error => {
     this.ErrorCont.showError(error);
   });
 }
 async cv_status(){

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

     this.http.get('https://habco.rshayanfar.ir/habco/pharmacist/'+
     localStorage.getItem('user_id').toString(),options).toPromise().then(resp => {

     this.cv_id = resp['data']['cv_id'];
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

 ionViewWillEnter() {
   this.app_token = localStorage.getItem('app-token');
   this.cv_status();

 }
 drugs_clicked(){

   this.router.navigate(['drugstore-drugs-page']);

 }
 prescriptions_clicked(){
   this.router.navigate(['drugstore-prescriptions-page']);

 }
 ngOnInit(){

 }
}
