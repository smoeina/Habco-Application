/* eslint-disable arrow-body-style */
/* eslint-disable quote-props */
/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { ErrorControllerService } from './error-controller.service';
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  my_dict = {'Yes':true,'No':false,'YES':true,'NO':false,'MALE':'male','FEMALE':'female','Male':'male','Female':'female'};
  otp_token ='';
  app_token = '';
  habcoCode?: string;
  constructor(private http: HttpClient,public ErrorCont: ErrorControllerService) { }

  register(email,phone,type) {
    console.log({'email':email,
    'phone':phone,
    'role':type});
  	return this.http.post('https://habco.rshayanfar.ir/habco/user',
    {'email':email,
    'phone':phone,
    'role':type});
  }



  login(phone_number) {
  	 return this.http.post('https://habco.rshayanfar.ir/habco/login-token' ,{'phone':phone_number});
  }





  sendValidationCode(OTP){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept:'application/json',
      'Authorization': 'Bearer '+ this.otp_token
    });
    const options = { headers: headers };
    console.log(headers);
    console.log('INE:'+'Bearer '+ this.otp_token);
    console.log({otp:OTP});
     return this.http.post('https://habco.rshayanfar.ir/habco/token',{otp:OTP},options);

  }

  Edit_information(first_name,last_name,address,covidRecord,gender,age,respiratory,infectious,
    cardiovascular,cancer,immunological,diabetes,
    infectiousArea,pet){
      this.app_token = localStorage.getItem('app-token');
      console.log(this.app_token);
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept':'application/json',
        'Authorization': 'Bearer '+ this.app_token
      });
      const options = { headers: headers };
      console.log(this.my_dict[gender]);
      console.log(first_name);
      console.log(last_name);
      console.log(age);
      console.log(address);


      this.http.patch('https://habco.rshayanfar.ir/habco/user',{fname:first_name,
      lname:last_name,address:address,age:age,gender:this.my_dict[gender]},options).toPromise().then(
        resp =>{
          console.log(resp);
        }

      ).catch(error => {
          this.ErrorCont.showError(error);

      });
      console.log({covid_19:this.my_dict[covidRecord],
        respiratory:this.my_dict[respiratory],infectious:this.my_dict[infectious],
        vascular:this.my_dict[cardiovascular],cancer:this.my_dict[cancer],
        imuloical:this.my_dict[immunological],diabetes:this.my_dict[diabetes],
        dangerous_area:this.my_dict[infectiousArea],pet:this.my_dict[pet],med_staff:false});
      this.http.patch('https://habco.rshayanfar.ir/habco/patient',{covid_19:this.my_dict[covidRecord],
      respiratory:this.my_dict[respiratory],infectious:this.my_dict[infectious],
      vascular:this.my_dict[cardiovascular],cancer:this.my_dict[cancer],
      imuloical:this.my_dict[immunological],diabetes:this.my_dict[diabetes],
      dangerous_area:this.my_dict[infectiousArea],pet:this.my_dict[pet],med_staff:false},options).toPromise().then(resp => {
        console.log(resp);
      }).catch(error => {
        console.log(error.toString());
        this.ErrorCont.showError(error);


      });;
      return this.http.get('https://habco.rshayanfar.ir/habco/patient/me',options);
  }

}
