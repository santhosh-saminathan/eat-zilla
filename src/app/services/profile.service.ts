import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'authId': localStorage.getItem('authId'),
    'authToken': localStorage.getItem('authToken'),
  })
};


let url = environment.apiUrl;
let deviceToken = environment.deviceToken;

@Injectable()
export class ProfileService {

  constructor(private http: HttpClient) { }

  getProfile() {
    console.log(httpOptions);
    return this.http.get(url + "foodie/api/get_profile", httpOptions);
  }

}