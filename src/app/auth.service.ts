/* eslint-disable quote-props */
/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/naming-convention */
import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  myDictionary = {
    'Male':'Male',
    'Female':'Female',
    'Yes':true,
    'No':false
  };
  habcoCode?: string;
  real_national_number?: string;
  constructor(private http: HttpClient,public userService: UserService) { }
  register(email,phone,type,national_number) {
    if (national_number.toString().length ===9){
      this.real_national_number= '0' + national_number.toString();
      console.log(this.real_national_number);

    }
    else{
      this.real_national_number= national_number.toString();
      console.log('YA:'+this.real_national_number);

    }
    console.log({'email':email,'phone'
    :phone.internationalNumber.replace(/\s/g, '').replace('+',''),'national_number':this.real_national_number,'role':type});
  	return this.http.post('http://135.181.65.177/habco/register',{'email':email,'phone'
    :phone.internationalNumber.replace(/\s/g, '').replace('+',''),'national_number':this.real_national_number,'role':type});
  }
  login() {
  	 return this.http.post('http://135.181.65.177/habco/login' , this.userService.user,{responseType: 'text'});
  }
  sendValidationCode(){
     return this.http.post('http://135.181.65.177/habco/otp-verify', {phoneNumber:this.userService.user.phone,
     OTP:this.userService.OTP}
     ,{responseType: 'text'});

  }
  getToken() {
  	return localStorage.getItem('user');
  }
  getHabcoCode(){
    console.log(this.userService.user.accessToken);
    return this.http.post('http://51.83.171.235:5000/get-habco-code',
    {token:localStorage.getItem('user')});
  }
  Edit_information(covidRecord,gender,age,respiratory,infectious
    ,cardiovascular,cancer,immunological,diabetes,medical,infectiousArea,pet){
    if(this.getToken()){
      console.log('The age is:');
      console.log(age);
      return this.http.post('http://51.83.171.235:5000/submit-data',
       {covidRecord:this.myDictionary[covidRecord],
        gender:this.myDictionary[gender]
        ,age:age
        ,respiratory:this.myDictionary[respiratory],
        infectious:this.myDictionary[infectious]
        ,cardiovascular:this.myDictionary[cardiovascular],
        cancer:this.myDictionary[cancer],
        immunological:this.myDictionary[immunological],
        diabetes:this.myDictionary[diabetes],
        medical:this.myDictionary[medical],
        infectiousArea:this.myDictionary[infectiousArea]
        ,pet:this.myDictionary[pet],
     token:this.getToken()}
     ,{responseType: 'text'});
    }


 }
}
