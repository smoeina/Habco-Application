import { Router } from '@angular/router';
/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DoctorServiceService } from '../doctor-service.service';

@Component({
  selector: 'app-doctor-prescriptions-page',
  templateUrl: './doctor-prescriptions-page.page.html',
  styleUrls: ['./doctor-prescriptions-page.page.scss'],
})
export class DoctorPrescriptionsPagePage implements OnInit {
  app_token = '';
  constructor(public router: Router,public http: HttpClient,public doctor_service: DoctorServiceService) { }

  ngOnInit() {
    this.app_token = localStorage.getItem('app-token');

  }
  get_prescriptions(){

  }
  add_pres_click(){
    this.router.navigate(['doctor-add-prescription']);
  }
}
