
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
export class CartService {

    constructor(private http: HttpClient) { }


    addToCart(data) {
        return this.http.post(url + "/add_to_cart", data, httpOptions);
    }

    removeFromCart(data) {
        return this.http.post(url + "/reduce_from_cart", data, httpOptions);
    }

    getCartItems() {
        return this.http.get(url + "/check_cart", httpOptions);
    }

    checkOutCart(data) {
        // body - coupon_code: 'testcode'
        return this.http.post(url + "/api/checkout", data, httpOptions);
    }



}