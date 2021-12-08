import { DoctorServiceService } from './../doctor-service.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-doctor-patients-page',
  templateUrl: './doctor-patients-page.page.html',
  styleUrls: ['./doctor-patients-page.page.scss'],
})
export class DoctorPatientsPagePage implements OnInit {
  myDict = {true:'Yes',false:'No',null:'Not filled yet'};

  constructor(public dc: DoctorServiceService,public modalController: ModalController) { }
  ngOnInit() {
  }

}
