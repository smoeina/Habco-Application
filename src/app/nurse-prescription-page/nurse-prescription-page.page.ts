import { NurseService } from './../nurse.service';
import { Router } from '@angular/router';
/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DoctorServiceService } from '../doctor-service.service';
@Component({
  selector: 'app-nurse-prescription-page',
  templateUrl: './nurse-prescription-page.page.html',
  styleUrls: ['./nurse-prescription-page.page.scss'],
})
export class NursePrescriptionPagePage implements OnInit {
  app_token = '';
  constructor(public router: Router,public http: HttpClient,public doctor_service: NurseService) { }

  ngOnInit() {
    this.app_token = localStorage.getItem('app-token');

  }
  get_prescriptions(){

  }
  add_pres_click(){
    this.router.navigate(['doctor-add-prescription']);
  }
}
