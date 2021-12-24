/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ErrorControllerService } from '../error-controller.service';
@Component({
  selector: 'app-user-home-page',
  templateUrl: './user-home-page.page.html',
  styleUrls: ['./user-home-page.page.scss'],
})
export class UserHomePagePage implements OnInit {
  dict = {'true':true,'false':false,'':false};
  profile_is_complete = false;
  habco_id = '';
  // eslint-disable-next-line @typescript-eslint/naming-convention
    app_token = '';

    constructor(public router: Router,private http: HttpClient,
      public loadingController: LoadingController,public ErrorCont: ErrorControllerService) { }
    ngOnInit(){
    }

    async get_id(){
      const loading = await this.loadingController.create({
        message: 'Please wait...',
      });
      await loading.present();
      this.app_token = localStorage.getItem('app-token');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept':'application/json',
        Authorization: 'Bearer '+ this.app_token,
      });
      const options = { headers };
      this.http.get('https://habco.rshayanfar.ir/habco/patient/habco_id',options).toPromise().then(async resp => {
        console.log(resp);

        if (resp['status']==='failure'){
          this.habco_id = resp['message'];
          this.profile_is_complete = false;
          await loading.dismiss();

        }
        if(resp['status']==='success'){
          this.habco_id = resp['data'];
          this.profile_is_complete = true;
          await loading.dismiss();

        }

      }).catch(async error => {
          console.log('Error');
          console.log(error);
          this.ErrorCont.showError(error);
          await loading.dismiss();

      });;
    }
    ionViewWillEnter() {
      this.get_id();
    }
    edit_button_clicked(){
      console.log('Clicked');
      this.router.navigate(['patient-edit-info']);
    }

    doctors_clicked(){
      this.router.navigate(['user-doctors-page']);

    }
    nurses_clicked(){
      this.router.navigate(['user-nurses-page']);

    }
    prescription_clicked(){
      this.router.navigate(['user-prescriptions-page']);

    }
}
