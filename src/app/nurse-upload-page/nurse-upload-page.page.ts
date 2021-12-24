/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit,ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ErrorControllerService } from '../error-controller.service';
@Component({
  selector: 'app-nurse-upload-page',
  templateUrl: './nurse-upload-page.page.html',
  styleUrls: ['./nurse-upload-page.page.scss'],
})
export class NurseUploadPagePage implements OnInit {
  @ViewChild('cv') cv;
  @ViewChild('fname') fname;
  @ViewChild('lname') lname;
  @ViewChild('proficiency') proficiency;
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
      console.log(fileReader.result);
       this.cv_base64 = fileReader.result;
    };
    this.cv_uploaded = true;
  }
  certification_file_changed(fileChangeEvent){
    this.certification_file = fileChangeEvent.target.files[0];
    console.log('File Loaded');
    const fileReader = new FileReader();
    fileReader.readAsDataURL(this.certification_file);
    fileReader.onload = () => {
      console.log(fileReader.result);
       this.certification_base64 = fileReader.result;
    };
    this.certification_uploaded = true;
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
    console.log(this.terms);
    if (this.terms.checked ===false){
      this.error_controller.showError('Please Accept our terms...');
      return 0;
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer '+ this.app_token,
    });
    const options = { headers };
    if (this.certification_uploaded && this.cv_uploaded){

      this.http.post('https://habco.rshayanfar.ir/habco/document',{file:this.cv_base64[1],file_type:'application/pdf',type:'cv'}
      ,options).toPromise().then(resp => {
        console.log(resp);

      }).catch(error => {
          console.log('Error');
          loading.dismiss();
          this.error_controller.showError(error);
      });;

      this.http.post('https://habco.rshayanfar.ir/habco/document',
      {file:this.certification_base64[1],file_type:'application/pdf',type:'document'}
      ,options).toPromise().then(resp => {
        console.log(resp);

      }).catch(error => {
          console.log('Error');
          loading.dismiss();
          this.error_controller.showError(error);
      });;
      this.http.patch('https://habco.rshayanfar.ir/habco/user',{fname:this.fname.value,
        lname:this.lname.value},options).toPromise().then(
          resp =>{
            console.log(resp);
          }

        ).catch(error => {
          loading.dismiss();
          this.error_controller.showError(error);
        });
        console.log(this.proficiency.value);
        this.http.put('https://habco.rshayanfar.ir/habco/nurse',{specialization:this.proficiency.value}
        ,options).toPromise().then(
          resp =>{
            console.log(resp);
            loading.dismiss();
            this.showAlert('Done','Upload Information Success','Wait till our supervisors check your info.');
            this.router.navigate(['nurse-home-page']);
          }
        ).catch(error => {
          loading.dismiss();
          this.error_controller.showError(error);
        });

    }
    else{
      loading.dismiss();
      this.error_controller.showErrorMessage('Please Upload your CV and Certification file...');
    }
    loading.dismiss();

  }

}
