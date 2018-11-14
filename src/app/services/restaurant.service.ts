import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { WebStorageService } from './web-storage.service';




let url = environment.apiUrl;
let deviceToken = environment.deviceToken;

@Injectable()
export class RestaurantService {
    constructor(private http: HttpClient, private webStorageService: WebStorageService) { }

    httpOptions = {
        headers: new HttpHeaders({
            'authId': this.webStorageService.getAuthId(),
            'authToken': this.webStorageService.getAuthToken(),
        })
    };


    getPopularBrands() {
        return this.http.get(url + "/get_popular_brands", this.httpOptions);
    }

    getNearByRestaurants(lat, lng) {
        return this.http.get(url + "/get_nearby_restaurant?lat=" + lat + "&lng=" + lng, this.httpOptions);
    }

}