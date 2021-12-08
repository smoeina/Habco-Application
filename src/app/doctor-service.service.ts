/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DoctorServiceService {
  // eslint-disable-next-line quote-props
  dict = {'true':true,'false':false,'':false,1:true,0:false};
  // eslint-disable-next-line @typescript-eslint/naming-convention
  profile_is_complete = this.dict[localStorage.getItem('profile_completed')];
  cv_id: any;
  document_id: any;
  cv_accepted = false;
  document_accepted = false;
  patients_list: any;
  prescriptions_list: any;
  constructor(private http: HttpClient) { }


}
