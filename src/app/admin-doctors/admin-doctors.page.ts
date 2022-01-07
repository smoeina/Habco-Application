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
  selector: 'app-admin-doctors',
  templateUrl: './admin-doctors.page.html',
  styleUrls: ['./admin-doctors.page.scss'],
})
export class AdminDoctorsPage implements OnInit {
  app_token = '';
  doctors_list: any;
  constructor(public alertController: AlertController,public http: HttpClient,
    public loadingController: LoadingController,public errorController: ErrorControllerService,
    public adminService: AdminService,private router: Router) { }
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
      this.doctors_list.sort(function(a, b) {
        var textA = a.fname;
        var textB = b.fname;
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
    var edited_doctors_list = [];
    for(let i=0;i < this.doctors_list.length; i++){
      if (this.doctors_list[i].fname){
        edited_doctors_list.push(this.doctors_list[i]);
      }
    }
    this.doctors_list = edited_doctors_list;
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
    this.get_doctors_list();
  }
  async select_doctor(doctor){
    this.adminService.selected_user = doctor;
    ;
    this.adminService.type = 'doctor';
    localStorage.setItem('selected_user',JSON.stringify(doctor));
    localStorage.setItem('type','doctor');

    this.router.navigate(['admin-see-info']);
  }
}
