import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { LoadingController, AlertController } from '@ionic/angular';
@Component({
  selector: 'app-informations',
  templateUrl: './informations.page.html',
  styleUrls: ['./informations.page.scss'],
})
export class InformationsPage implements OnInit {
  covidRecord: string;
  gender: string;
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

    this.authService.Edit_information( this.covidRecord,this.gender,this.age,this.respiratory,this.infectious,
      this.cardiovascular,this.cancer,this.immunological,this.diabetes,this.medical,
      this.infectiousArea,this.pet).toPromise().then(resp => {
        console.log(resp);
        this.authService.habcoCode = resp;
         loading.dismiss();
        this.router.navigate(['home']);

      }).catch(error => {
         console.log(error);
         loading.dismiss();
        this.showError(error);
      });;
  }
}
