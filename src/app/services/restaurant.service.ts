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
export class RestaurantService {

    constructor(private http: HttpClient) { }

    getPopularBrands() {
        return this.http.get(url + "foodie/api/get_popular_brands", httpOptions);
    }

    getNearByRestaurants(lat, lng) {
        return this.http.get(url + "foodie/api/get_nearby_restaurant?lat=" + lat + "&lng=" + lng, httpOptions);
    }

}