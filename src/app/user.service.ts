/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { User } from './user';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  OTP: any =  {
    first: '',
    second: '',
    third: '',
    forth: '',

  };
  constructor(public user: User){

  }
}
