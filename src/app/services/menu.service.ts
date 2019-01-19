import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';


let url = environment.apiUrl;
let deviceToken = environment.deviceToken;

@Injectable()
export class MenuService {

    constructor(private http: HttpClient) { }


    getMenus(data) {
        data.device_token = deviceToken;
        data.authId = localStorage.getItem('authId');
        data.authToken = localStorage.getItem('authToken');
        return this.http.post(url + "/get_menu", data);
    }

    getCategory(data) {
        return this.http.get(url + "/get_category/" + data + "?authId=" + localStorage.getItem('authId') + "&authToken=" + localStorage.getItem('authToken'));
    }

    getCategoryWiseMenu(data) {
        data.authId = localStorage.getItem('authId');
        data.authToken = localStorage.getItem('authToken');
        return this.http.post(url + "/get_category_wise_food_list", data);
    }

    getFoodList(data) {
        data.authId = localStorage.getItem('authId');
        data.authToken = localStorage.getItem('authToken');
        return this.http.post(url + "/get_food_list", data);
    }

    getRestaurantDetails(data) {
        data.authId = localStorage.getItem('authId');
        data.authToken = localStorage.getItem('authToken');
        return this.http.post(url + "/single_restaurant", data);
    }


}