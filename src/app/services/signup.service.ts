import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';


let url = environment.apiUrl;
let deviceToken = environment.deviceToken;

@Injectable()
export class SignUpService {

    constructor(private http: HttpClient) { }


    registerUser(data) {
        data.device_token = deviceToken;
        return this.http.post(url + "/register", data);
    }

    loginUser(data) {
        data.device_token = deviceToken;
        return this.http.post(url + "/login", data);
    }

    logout() {

        const httpOptions = {
            headers: new HttpHeaders({
                'authId': localStorage.getItem('authId'),
                'authToken': localStorage.getItem('authToken'),
            })
        };
        return this.http.get(url + "/logout", httpOptions);
    }

    forgotPassword(data) {
        return this.http.post(url + "/forgot_password", data);
    }

    resetPassword(data) {
        return this.http.post(url + "/reset_password", data);

    }

}