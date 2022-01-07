/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable no-var */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { Router } from '@angular/router';
import { AdminService } from './../admin.service';
/* eslint-disable max-len */
import { ErrorControllerService } from './../error-controller.service';
import { LoadingController, AlertController } from '@ionic/angular';
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-admin-drugstores',
  templateUrl: './admin-drugstores.page.html',
  styleUrls: ['./admin-drugstores.page.scss'],
})
export class AdminDrugstoresPage implements OnInit {
  app_token = '';
  pharmacists_list: any;
  constructor(public alertController: AlertController,public http: HttpClient,
    public loadingController: LoadingController,public errorController: ErrorControllerService,
    public adminService: AdminService,private router: Router) { }
  async get_pharmacists_list(){
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
    this.http.get('https://habco.rshayanfar.ir/habco/pharmacist',options).toPromise().then(async resp => {
      this.pharmacists_list = resp['data'];
      this.pharmacists_list.sort(function(a, b) {
        var textA = a.fname;
        var textB = b.fname;
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
    var edited_pharmacists_list = [];
    for(let i=0;i < this.pharmacists_list.length; i++){
      if (this.pharmacists_list[i].fname){
        edited_pharmacists_list.push(this.pharmacists_list[i]);
      }
    }
    this.pharmacists_list = edited_pharmacists_list;
      console.log(resp['data']);
      await loading.dismiss();

    }).catch(async error => {
      await loading.dismiss();
        this.errorController.showError(error);
    });
  }
  ngOnInit() {
  }
  ionViewWillEnter() {
    this.get_pharmacists_list();
  }
  async select_pharmacist(pharmacist){
    this.adminService.selected_user = pharmacist;
    ;
    this.adminService.type = 'pharmacist';
    localStorage.setItem('selected_user',JSON.stringify(pharmacist));
    localStorage.setItem('type','pharmacist');

    this.router.navigate(['admin-see-info']);
  }
}
