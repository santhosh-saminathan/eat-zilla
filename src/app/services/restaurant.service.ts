import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { WebStorageService } from './web-storage.service';




let url = environment.apiUrl;
let deviceToken = environment.deviceToken;

@Injectable()
export class RestaurantService {
    constructor(private http: HttpClient, private webStorageService: WebStorageService) { }

    getPopularBrands() {

        // let httpOptions = {
        //     headers: new HttpHeaders({
        //         'authId': this.webStorageService.getAuthId(),
        //         'authToken': this.webStorageService.getAuthToken(),
        //     })
        // };
        return this.http.get(url + "/get_popular_brands?authId="+localStorage.getItem('authId')+"&authToken="+localStorage.getItem('authToken'));

        
        // return this.http.get(url + "/get_popular_brands", httpOptions);
    }

    getNearByRestaurants(lat, lng) {

        // let httpOptions = {
        //     headers: new HttpHeaders({
        //         'authId': this.webStorageService.getAuthId(),
        //         'authToken': this.webStorageService.getAuthToken(),
        //     })
        // };
        return this.http.get(url + "/get_nearby_restaurant?lat="+lat+"&lng="+lng+"&authId="+localStorage.getItem('authId')+"&authToken="+localStorage.getItem('authToken'));

        // return this.http.get(url + "/get_nearby_restaurant?lat=" + lat + "&lng=" + lng, httpOptions);
    }

    updateFavoriteRestaurant(data) {
        // let httpOptions = {
        //     headers: new HttpHeaders({
        //         'authId': this.webStorageService.getAuthId(),
        //         'authToken': this.webStorageService.getAuthToken(),
        //     })
        // };

        data.authId = localStorage.getItem('authId');
        data.authToken = localStorage.getItem('authToken');
        return this.http.post(url + "/update_favourite", data);

    }
}