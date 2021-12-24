import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class ErrorControllerService {

  constructor(public loadingController: LoadingController
    ,public alertController: AlertController) { }

    async showError(errorMessage) {

      const alert = await this.alertController.create({
        header: 'Error',
        message: errorMessage.error.message
        ,
        buttons: ['OK']
      });
      await alert.present();
    } ;
    async showErrorMessage(errorMessage) {

      const alert = await this.alertController.create({
        header: 'Error',
        message: errorMessage
        ,
        buttons: ['OK']
      });
      await alert.present();
    } ;
}
