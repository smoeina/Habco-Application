/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit,ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ErrorControllerService } from '../error-controller.service';
@Component({
  selector: 'app-drugstore-edit-info',
  templateUrl: './drugstore-edit-info.page.html',
  styleUrls: ['./drugstore-edit-info.page.scss'],
})
export class DrugstoreEditInfoPage implements OnInit {

  @ViewChild('cv') cv;
  @ViewChild('fname') fname;
  @ViewChild('lname') lname;
  @ViewChild('terms') terms;
  app_token = '';
  cv_file: File;
  certification_file: File;
  cv_base64: any;
  certification_base64: any;
  cv_uploaded = false;
  certification_uploaded = false;
  constructor(public http: HttpClient,public error_controller: ErrorControllerService,
    public alertController: AlertController,public router: Router,public loadingController: LoadingController) {
  }
  ngOnInit() {
    this.app_token = localStorage.getItem('app-token');

  }
  cv_file_changed(fileChangeEvent){
    this.cv_file = fileChangeEvent.target.files[0];
    console.log('File Loaded');
    const fileReader = new FileReader();
    fileReader.readAsDataURL(this.cv_file);
    fileReader.onload = () => {
       this.cv_base64 = fileReader.result;
    };
    this.cv_uploaded = true;
  }
  changeFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}
  async showAlert(header,subHeader,message) {
    const alert = await this.alertController.create({
      header,
      cssClass:'my-custom-class',
      subHeader,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }


  async upload_clicked(){
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
   await loading.present();
    if (this.terms.checked ===false){
      this.error_controller.showError('Please Accept our terms...');
      return 0;
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer '+ this.app_token,
    });
    const options = { headers };
    if (this.cv_uploaded){
      console.log(this.cv_base64);
      console.log(this.cv_base64.split(',')[1]);
      const data_to_send = {file:this.cv_base64.split(',')[1],file_type:'application/pdf',type:'cv'};
      console.log(data_to_send);
      this.http.post('https://habco.rshayanfar.ir/habco/document',{file:this.cv_base64.split(',')[1],file_type:'application/pdf',type:'cv'}
      ,options).toPromise().then(resp => {
        console.log(resp);

      }).catch(error => {
          console.log('Error');
          loading.dismiss();
          this.error_controller.showError(error);
      });

      this.http.patch('https://habco.rshayanfar.ir/habco/user',{fname:this.fname.value,
        lname:this.lname.value},options).toPromise().then(
          resp =>{
            console.log(resp);
          }

        ).catch(error => {
          loading.dismiss();
          this.error_controller.showError(error);
        });
        //console.log(this.proficiency.value);
        // this.http.put('https://habco.rshayanfar.ir/habco/nurse',{specialization:this.proficiency.value}
        // ,options).toPromise().then(
        //   resp =>{
        //     console.log(resp);
        //     loading.dismiss();
        //     this.showAlert('Done','Upload Information Success','Wait till our supervisors check your info.');
        //     this.router.navigate(['nurse-home-page']);
        //   }
        // ).catch(error => {
        //   loading.dismiss();
        //   this.error_controller.showError(error);
        // });

    }
    else{
      loading.dismiss();
      this.error_controller.showErrorMessage('Please Upload your CV and Certification file...');
    }
    loading.dismiss();

  }
}
