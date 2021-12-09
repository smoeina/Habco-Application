/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-home-page',
  templateUrl: './user-home-page.page.html',
  styleUrls: ['./user-home-page.page.scss'],
})
export class UserHomePagePage implements OnInit {
  dict = {'true':true,'false':false,'':false};
  profile_is_complete = false;
  // eslint-disable-next-line @typescript-eslint/naming-convention
    app_token = '';
    constructor(public router: Router,private http: HttpClient) { }
    ngOnInit(){
    }
    ionViewWillEnter() {
      this.app_token = localStorage.getItem('app-token');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer '+ this.app_token,
      });
      const options = { headers };
      this.http.get('http://135.181.65.177/habco/user',options).toPromise().then(resp => {
        console.log(resp);
        if (resp['data']==null){
            this.profile_is_complete = false;
        }
        else{
          this.profile_is_complete = true;
        }
      }).catch(error => {
          console.log('Error');
          console.log(error);
      });;
    }
    edit_button_clicked(){
      console.log('Clicked');
      this.router.navigate(['patient-edit-info']);
    }

    doctors_clicked(){
      this.router.navigate(['user-doctors-page']);

    }
    nurses_clicked(){
      this.router.navigate(['user-nurses-page']);

    }
}
