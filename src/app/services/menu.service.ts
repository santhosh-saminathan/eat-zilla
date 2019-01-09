import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';


let url = environment.apiUrl;
let deviceToken = environment.deviceToken;

@Injectable()
export class MenuService {

    constructor(private http: HttpClient) { }


    getMenus(data) {
        // const httpOptions = {
        //     headers: new HttpHeaders({
        //         'authId': localStorage.getItem('authId'),
        //         'authToken': localStorage.getItem('authToken'),
        //     })
        // };
        data.device_token = deviceToken;
        data.authId = localStorage.getItem('authId');
        data.authToken = localStorage.getItem('authToken');
        return this.http.post(url + "/get_menu", data);
    }

    getCategory(data) {
        // const httpOptions = {
        //     headers: new HttpHeaders({
        //         'authId': localStorage.getItem('authId'),
        //         'authToken': localStorage.getItem('authToken'),
        //     })
        // };
        return this.http.get(url + "/get_category/"+data+"?authId="+localStorage.getItem('authId')+"&authToken="+localStorage.getItem('authToken'));

        // return this.http.get(url + "/get_category/" + data, httpOptions);
    }

    getCategoryWiseMenu(data) {
        // const httpOptions = {
        //     headers: new HttpHeaders({
        //         'authId': localStorage.getItem('authId'),
        //         'authToken': localStorage.getItem('authToken'),
        //     })
        // };
        data.authId = localStorage.getItem('authId');
        data.authToken = localStorage.getItem('authToken');
        return this.http.post(url + "/get_category_wise_food_list", data);
    }

    getFoodList(data) {
        // const httpOptions = {
        //     headers: new HttpHeaders({
        //         'authId': localStorage.getItem('authId'),
        //         'authToken': localStorage.getItem('authToken'),
        //     })
        // };
        data.authId = localStorage.getItem('authId');
        data.authToken = localStorage.getItem('authToken');
        return this.http.post(url + "/get_food_list", data);
    }


}