import { LoadingController } from '@ionic/angular';
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable quote-props */
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
      public errorController: ErrorControllerService,
      public alertController: AlertController,public loadingController: LoadingController) { }

    ngOnInit() {

    }


    whats_app_clicked(doctor){
      window.open('https://wa.me/'+doctor.user.phone);

    }

    allDoctorsClicked(){
        this.router.navigate(['user-doctors-all-doctors']);
    }
    myDoctorsClicked(){
      this.router.navigate(['user-doctors-my-doctors']);

    }
    }

