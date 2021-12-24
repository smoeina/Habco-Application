import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { LoadingController, AlertController } from '@ionic/angular';
@Component({
  selector: 'app-patient-edit-info',
  templateUrl: './patient-edit-info.page.html',
  styleUrls: ['./patient-edit-info.page.scss'],
})
export class PatientEditInfoPage implements OnInit {
  @ViewChild('firstName') firstName;
  @ViewChild('lastName') lastName;
  @ViewChild('address') address;

  gender: string;
  covidRecord: string;
  age: string;
  respiratory: string;
  infectious: string;
  cardiovascular: string;
  cancer: string;
  immunological: string;
  diabetes: string;
  medical: string;
  infectiousArea: string;
  pet: string;
  constructor(private authService: AuthService,private loadingController: LoadingController,
    private alertController: AlertController,private router: Router) {

   }

  ngOnInit() {
  }
  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }
  async showError(errorMessage) {
    const alert = await this.alertController.create({
      header: 'Error in sending data',
      message: errorMessage.error,
      buttons: ['OK']
    });

    await alert.present();
  }
  async onClickSubmit(){
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
   await loading.present();
   console.log('jens');
    console.log(this.gender);
    this.authService.Edit_information(this.firstName.value,this.lastName.value ,
      this.address.value,this.covidRecord,this.gender,this.age,this.respiratory,this.infectious,
       this.cardiovascular,this.cancer,this.immunological,this.diabetes,
       this.infectiousArea,this.pet)
       .toPromise().then(resp => {
         console.log(resp);
          loading.dismiss();
         this.router.navigate(['user-home-page']);
       }).catch(error => {
          console.log(error);
          loading.dismiss();
         this.showError(error);
       });;
  }

  cancelClicked(){
    this.router.navigate(['user-home-page']);
  }
}
