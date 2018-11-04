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
export class MenuService {

    constructor(private http: HttpClient) { }


    getMenus(data) {
        data.device_token = deviceToken;
        console.log(data);
        return this.http.post(url + "foodie/api/get_menu", data, httpOptions);
    }

    getCategory(data) {
        return this.http.get(url + "foodie/api/get_category/" + data, httpOptions);
    }

    getCategoryWiseMenu(data) {
        console.log(data);
        return this.http.post(url + "foodie/api/get_category_wise_food_list", data, httpOptions);
    }


}