/* eslint-disable no-var */
/* eslint-disable quote-props */
/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
/* eslint-disable @typescript-eslint/dot-notation */
import { Router } from '@angular/router';
import { AdminService } from './../admin.service';
/* eslint-disable max-len */
import { ErrorControllerService } from './../error-controller.service';
import { LoadingController, AlertController } from '@ionic/angular';
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-admin-see-info',
  templateUrl: './admin-see-info.page.html',
  styleUrls: ['./admin-see-info.page.scss'],
})
export class AdminSeeInfoPage implements OnInit {

  app_token = '';
  cv_id: any;
  document_id: any;
  doctor = false;
  nurse = false;
  pharmacist = false;
  user_info: any;
  document_accepted = false;
  document_disabled = true;
  cv_accepted = false;
  cv_disabled = true;

  constructor(public alertController: AlertController,public http: HttpClient,
    public loadingController: LoadingController,public errorController: ErrorControllerService,
    public adminService: AdminService) { }

  ngOnInit() {
    var obj = JSON.parse(localStorage.getItem('selected_user'))
    if (obj != null && localStorage.getItem('type') !== undefined ){
      this.adminService.type = localStorage.getItem('type')
      this.adminService.selected_user = obj
    }
  }
  check_doc(){
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
    if(this.document_id !==null && this.document_id === 'number'){
      this.http.get('https://habco.rshayanfar.ir/habco/document/'+ this.document_id,options).toPromise().then(async resp => {
      this.document_accepted = resp['data']['verified'];
      this.document_disabled = false;
    }).catch(async error => {
        this.errorController.showError(error);
    });

    }
    else{
      this.document_disabled = true;
    }
  }

  async check_cv(){
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    await loading.present();
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
    if(this.cv_id !==null && typeof this.cv_id === 'number'){
      this.http.get('https://habco.rshayanfar.ir/habco/document/'+ this.cv_id,options).toPromise().then(async resp => {

      await loading.dismiss();
      this.cv_disabled = false;
      this.cv_accepted = resp['data']['verified'];
    }).catch(async error => {
      await loading.dismiss();
        this.errorController.showError(error);
    });

    }
    else{
      this.cv_disabled = true;
      await loading.dismiss();
    }
  }
  async ionViewWillEnter(){
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
    await loading.dismiss();
    this.adminService.type = localStorage.getItem('type');
    this.adminService.selected_user = JSON.parse(localStorage.getItem('selected_user'));
    console.log(this.adminService.type);
    console.log(this.adminService.selected_user);

    if (this.adminService.type ==='doctor'){
      this.doctor = true;
      this.nurse = false;
      this.pharmacist = false;
      this.http.get('https://habco.rshayanfar.ir/habco/doctor/'+ this.adminService.selected_user.id,options).toPromise().then(async resp => {
        await loading.dismiss();
        this.cv_id = resp['data']['cv_id'];
        this.document_id = resp['data']['document_id'];
        this.check_doc();
        this.check_cv()
      }).catch(async error => {
        await loading.dismiss();
          this.errorController.showError(error);
      });


    }
    if (this.adminService.type ==='nurse'){
      this.nurse = true;
      this.doctor = false;
      this.pharmacist = false;
      this.http.get('https://habco.rshayanfar.ir/habco/nurse/'+ this.adminService.selected_user.id,options).toPromise().then(async resp => {
        await loading.dismiss();
        this.cv_id = resp['data']['cv_id'];
        this.document_id = resp['data']['document_id'];
        this.check_doc();
        this.check_cv()
      }).catch(async error => {
        await loading.dismiss();
          this.errorController.showError(error);
      });
    }
    console.log(this.adminService.type)
    if (this.adminService.type ==='pharmacist'){
      this.pharmacist = true;
      this.nurse = false;
      this.doctor = false;
      this.http.get('https://habco.rshayanfar.ir/habco/pharmacist/'+ this.adminService.selected_user.id,options).toPromise().then(async resp => {
        await loading.dismiss();
        this.cv_id = resp['data']['cv_id'];
        this.check_cv();
      }).catch(async error => {
        await loading.dismiss();
          this.errorController.showError(error);
      });
    }

  }

  async get_document(){
    if (this.document_id){

      // await loading.present();
      this.app_token = localStorage.getItem('app-token');
      const headers = new HttpHeaders({
        Authorization: 'Bearer '+ this.app_token,
        'Accept': 'text/html, application/xhtml+xml,application/pdf, */*',
        'Content-Type': 'application/x-www-form-urlencoded',
          'cache-control': 'no-cache',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token, Accept, Authorization, X-Request-With, Access-Control-Request-Method, Access-Control-Request-Headers',
          'Access-Control-Allow-Credentials' : 'true',
          'Access-Control-Allow-Methods' : 'GET, POST, DELETE, PUT, OPTIONS, TRACE, PATCH, CONNECT',responseType: 'text'
      });
      var options = { headers,'responseType': 'blob' as 'json'};
        this.http.get('https://habco.rshayanfar.ir/habco/document/'+ this.document_id+'/download',options).toPromise().then(async resp => {
          var url= window.URL.createObjectURL(resp);
          window.open(url);
          // await loading.dismiss();
        }).catch(async error => {
          // await loading.dismiss();
          console.log(error.error);
            this.errorController.showError(error.error);
        });
    }
    else{
        this.errorController.showErrorMessage('Document has not uploaded yet...');

    }

  }


  async get_cv(){
    if (this.cv_id){

      // await loading.present();
      this.app_token = localStorage.getItem('app-token');
      const headers = new HttpHeaders({
        Authorization: 'Bearer '+ this.app_token,
        'Accept': 'text/html, application/xhtml+xml,application/pdf, */*',
        'Content-Type': 'application/x-www-form-urlencoded',
          'cache-control': 'no-cache',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token, Accept, Authorization, X-Request-With, Access-Control-Request-Method, Access-Control-Request-Headers',
          'Access-Control-Allow-Credentials' : 'true',
          'Access-Control-Allow-Methods' : 'GET, POST, DELETE, PUT, OPTIONS, TRACE, PATCH, CONNECT',responseType: 'text'
      });
      var options = { headers,'responseType': 'blob' as 'json'};
        this.http.get('https://habco.rshayanfar.ir/habco/document/'+ this.cv_id+'/download',options).toPromise().then(async resp => {
          var url= window.URL.createObjectURL(resp);
          window.open(url);
          // await loading.dismiss();
        }).catch(async error => {
          // await loading.dismiss();
            this.errorController.showError(error.error);
        });
    }
    else{
        this.errorController.showErrorMessage('CV has not uploaded yet...');

    }

  }
  async doc_toggled(event){
    var doc_checked = event.detail.checked;
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    await loading.present();
    console.log('doc_');
    console.log(doc_checked);
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
    this.http.put('https://habco.rshayanfar.ir/habco/document/'+ this.document_id,{'verified':doc_checked},options).toPromise().then(async resp => {
      await loading.dismiss();
      this.check_doc();
    }).catch(async error => {
      await loading.dismiss();
        this.errorController.showError(error);
    });
  }
  async cv_toggled(event){
    var cv_checked = event.detail.checked;
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
    this.http.put('https://habco.rshayanfar.ir/habco/document/'+ this.cv_id,{'verified':cv_checked},options).toPromise().then(async resp => {
      await loading.dismiss();
      this.check_cv();
    }).catch(async error => {
      await loading.dismiss();
        this.errorController.showError(error);
    });
  }












}
