/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ErrorControllerService } from '../error-controller.service';
@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.page.html',
  styleUrls: ['./admin-home.page.scss'],
})
export class AdminHomePage implements OnInit {
  dict = {'true':true,'false':false,'':false};
  profile_is_complete = false;
  habco_id = '';
  // eslint-disable-next-line @typescript-eslint/naming-convention
    app_token = '';

    constructor(public router: Router,private http: HttpClient,
      public loadingController: LoadingController,public ErrorCont: ErrorControllerService) { }
    ngOnInit(){
    }


    ionViewWillEnter() {
    }
    doctors_clicked(){
      this.router.navigate(['admin-doctors']);

    }
    nurses_clicked(){
      this.router.navigate(['admin-nurses']);

    }

    drugstores_clicked(){
      this.router.navigate(['admin-drugstores']);
    }
}
