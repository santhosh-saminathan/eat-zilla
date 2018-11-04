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
export class SignUpService {

    constructor(private http: HttpClient) { }


    registerUser(data) {
        data.device_token = deviceToken;
        return this.http.post(url + "foodie/api/register", data);
    }

    loginUser(data) {
        data.device_token = deviceToken;
        return this.http.post(url + "foodie/api/login", data);
    }

    logout() {
        return this.http.get(url + "foodie/api/logout", httpOptions);
    }

    forgotPassword(data) {
        return this.http.post(url + "foodie/api/forgot_password", data);
    }

    resetPassword(data) {
        return this.http.post(url + "foodie/api/reset_password", data);

    }

}