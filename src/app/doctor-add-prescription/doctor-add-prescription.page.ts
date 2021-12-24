import { ErrorControllerService } from './../error-controller.service';
/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/dot-notation */
import { HttpClient } from '@angular/common/http';
/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable @typescript-eslint/naming-convention */
import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DoctorServiceService } from '../doctor-service.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-doctor-add-prescription',
  templateUrl: './doctor-add-prescription.page.html',
  styleUrls: ['./doctor-add-prescription.page.scss'],
})
export class DoctorAddPrescriptionPage implements OnInit {
  @ViewChild('selected_patient') selected_patient;
  @ViewChild('prescription') prescription_field;

  patient_names_ids = {};
  app_token = '';
  prescription = '';
  constructor(public doctorService: DoctorServiceService,public http: HttpClient,
    public ErrorCont: ErrorControllerService,public loadingController: LoadingController) { }
  ngOnInit(){
  }
  ionViewWillEnter(){
    this.app_token = localStorage.getItem('app-token');
    for (let i = 0; i < this.doctorService.patients_list.length; i++) {
      this.patient_names_ids[this.doctorService.patients_list[i].user.fname.toString() +' '+
       this.doctorService.patients_list[i].user.lname.toString()] = this.doctorService.patients_list[i].id;
     }
  }
  // http://localhost:8000/habco/prescription/patient/26
  async submit_prescription(){
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
   await loading.present();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer '+ this.app_token,
    });
    const options = { headers: headers };
    console.log(this.selected_patient.value);
    loading.present();
    this.http.post('https://habco.rshayanfar.ir/habco/prescription/patient'+this.selected_patient.value
    ,{text: this.prescription_field.value}
    ,options).toPromise().then(resp => {
        console.log(resp);

     }).catch(error => {
          console.log('Error');
          this.ErrorCont.showError(error);
          loading.dismiss();

      });
  }
}
