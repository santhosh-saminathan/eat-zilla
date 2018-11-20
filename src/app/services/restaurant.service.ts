import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { WebStorageService } from './web-storage.service';




let url = environment.apiUrl;
let deviceToken = environment.deviceToken;

@Injectable()
export class RestaurantService {
    constructor(private http: HttpClient, private webStorageService: WebStorageService) { }

    // httpOptions = {
    //     headers: new HttpHeaders({
    //         'authId': this.webStorageService.getAuthId(),
    //         'authToken': this.webStorageService.getAuthToken(),
    //     })
    // };


    getPopularBrands() {

        let httpOptions = {
            headers: new HttpHeaders({
                'authId': this.webStorageService.getAuthId(),
                'authToken': this.webStorageService.getAuthToken(),
            })
        };

        return this.http.get(url + "/get_popular_brands", httpOptions);
    }

    getNearByRestaurants(lat, lng) {

        let httpOptions = {
            headers: new HttpHeaders({
                'authId': this.webStorageService.getAuthId(),
                'authToken': this.webStorageService.getAuthToken(),
            })
        };

        return this.http.get(url + "/get_nearby_restaurant?lat=" + lat + "&lng=" + lng, httpOptions);
    }

}