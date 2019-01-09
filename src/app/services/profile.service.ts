import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';




let url = environment.apiUrl;
let deviceToken = environment.deviceToken;

@Injectable()
export class ProfileService {

  constructor(private http: HttpClient) { }

  getProfile() {
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'authId': localStorage.getItem('authId'),
    //     'authToken': localStorage.getItem('authToken'),
    //   })
    // };
    return this.http.get(url + "/get_profile?authId="+localStorage.getItem('authId')+"&authToken="+localStorage.getItem('authToken'));

    // return this.http.get(url + "/get_profile", httpOptions);
  }

  updateProfile(data) {
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json'
    //   })
    // }
    data.authId = localStorage.getItem('authId');
    data.authToken = localStorage.getItem('authToken');
    return this.http.post(url + "/update_profile", data);
  }

  getFavouriteRestaurants() {
    // const httpOptions = {
    //   headers: new HttpHeaders({

    //     'authId': localStorage.getItem('authId'),
    //     'authToken': localStorage.getItem('authToken'),
    //   })
    // };
    return this.http.get(url + "/get_favourite_list?authId="+localStorage.getItem('authId')+"&authToken="+localStorage.getItem('authToken'));

    // return this.http.get(url + "/get_favourite_list", httpOptions);
  }

}