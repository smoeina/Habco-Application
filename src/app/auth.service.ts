/* eslint-disable arrow-body-style */
/* eslint-disable quote-props */
/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  my_dict = {'Yes':true,'No':false,'YES':true,'NO':false,'MALE':'male','FEMALE':'female'};
  otp_token ='';
  app_token = '';
  myDictionary = {
    'Male':'Male',
    'Female':'Female',
    'Yes':true,
    'No':false
  };
  habcoCode?: string;
  constructor(private http: HttpClient) { }

  register(email,phone,type,national_number) {
    console.log({'email':email,
    'phone':phone,
    'national_number':national_number,
    'role':type});
  	return this.http.post('http://135.181.65.177/habco/user',
    {'email':email,
    'phone':phone,
    'national_number':national_number,
    'role':type});
  }



  login(national_number,phone_number) {
  	 return this.http.post('http://135.181.65.177/habco/login-token' ,{'national_number':national_number,
    'phone':phone_number});
  }





  sendValidationCode(OTP){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ this.otp_token
    });
    const options = { headers: headers };
    console.log(headers);
    console.log('INE:'+'Bearer '+ this.otp_token);
    console.log({otp:OTP});
     return this.http.post('http://135.181.65.177/habco/token',{otp:OTP},options);

  }

  Edit_information(first_name,last_name,address,covidRecord,gender,age,respiratory,infectious,
    cardiovascular,cancer,immunological,diabetes,
    infectiousArea,pet){
      this.app_token = localStorage.getItem('app-token');
      console.log(this.app_token);
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ this.app_token
      });
      const data_to_send = {covid19:covidRecord,
        respiratory:this.my_dict[respiratory],infectious:this.my_dict[infectious],
        vascular:this.my_dict[cardiovascular],cancer:this.my_dict[cancer],
        immunological:this.my_dict[immunological],diabetes:this.my_dict[diabetes],
        dangerous_area:this.my_dict[infectiousArea],pet:this.my_dict[pet]};
      const options = { headers: headers };

      this.http.patch('http://135.181.65.177/habco/user',{fname:first_name,
      lname:last_name,address:address,age:age,gender:this.my_dict[gender]},options).toPromise().then(
        resp =>{
          console.log(resp);
        }

      ).catch(error => {
          console.log(error);
      });
      this.http.get('http://135.181.65.177/habco/disease_record',options).toPromise().then(resp => {
        console.log(resp);
        if (resp['data']==null){

          return this.http.post('http://135.181.65.177/habco/disease_record',data_to_send,options);

        }
        else{
          return this.http.patch('http://135.181.65.177/habco/disease_record',data_to_send,options);
        }

      }).catch(error => {
          return this.http.post('http://135.181.65.177/habco/disease_record',data_to_send,options);
      });;
      return this.http.get('http://135.181.65.177/habco/user',options);
  }

}
