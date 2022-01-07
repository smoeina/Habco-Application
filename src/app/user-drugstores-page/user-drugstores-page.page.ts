/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ErrorControllerService } from '../error-controller.service';

@Component({
  selector: 'app-user-drugstores-page',
  templateUrl: './user-drugstores-page.page.html',
  styleUrls: ['./user-drugstores-page.page.scss'],
})
export class UserDrugstoresPagePage implements OnInit {
  drugstore_clicked_flag = false;
  dict = {true:true,false:false,'':false};
  profile_is_complete = false;
  habco_id = '';
  doctors: any;
  drugs: any;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  app_token = '';
  constructor(public router: Router,private http: HttpClient,
    public loadingController: LoadingController,public ErrorCont: ErrorControllerService) { }
  async ionViewWillEnter() {
    this.app_token = localStorage.getItem('app-token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept:'application/json',
      Authorization: 'Bearer '+ this.app_token,
    });
    const options = { headers };
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
      loading.present();
      this.http.get('https://habco.rshayanfar.ir/habco/pharmacist',options).toPromise().then(async resp => {
        console.log(resp);
        this.doctors = resp['data']
        await loading.dismiss();

      }).catch(async error => {
          console.log('Error');
          console.log(error);
          this.ErrorCont.showError(error);
          await loading.dismiss();

      });;
  }
  ngOnInit() {
  }
  async drugstore_clicked(doctor){
    this.app_token = localStorage.getItem('app-token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept:'application/json',
      Authorization: 'Bearer '+ this.app_token,
    });
    const options = { headers };
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
      loading.present();
      this.http.get('https://habco.rshayanfar.ir/habco/pharmacist/'+doctor.id+'/drug',options).toPromise().then(async resp => {
        console.log(resp);
        this.drugs = resp['data'];
        this.drugstore_clicked_flag = true;
        await loading.dismiss();

      }).catch(async error => {
          console.log('Error');
          console.log(error);
          this.ErrorCont.showError(error);
          await loading.dismiss();

      });;
  }
}
