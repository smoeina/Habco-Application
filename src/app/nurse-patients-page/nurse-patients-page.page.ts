import { NurseService } from './../nurse.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-nurse-patients-page',
  templateUrl: './nurse-patients-page.page.html',
  styleUrls: ['./nurse-patients-page.page.scss'],
})
export class NursePatientsPagePage implements OnInit {

  myDict = {true:'Yes',false:'No',null:'Not filled yet'};

  constructor(public dc: NurseService,public modalController: ModalController) { }
  ngOnInit() {
  }

}
