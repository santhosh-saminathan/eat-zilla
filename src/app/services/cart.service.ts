
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';



let url = environment.apiUrl;
let deviceToken = environment.deviceToken;

@Injectable()
export class CartService {

    constructor(private http: HttpClient) { }


    addToCart(data) {
        const httpOptions = {
            headers: new HttpHeaders({
                'authId': localStorage.getItem('authId'),
                'authToken': localStorage.getItem('authToken'),
            })
        };
        return this.http.post(url + "/add_to_cart", data, httpOptions);
    }

    removeFromCart(data) {
        const httpOptions = {
            headers: new HttpHeaders({
                'authId': localStorage.getItem('authId'),
                'authToken': localStorage.getItem('authToken'),
            })
        };
        return this.http.post(url + "/reduce_from_cart", data, httpOptions);
    }

    getCartItems() {
        const httpOptions = {
            headers: new HttpHeaders({
                'authId': localStorage.getItem('authId'),
                'authToken': localStorage.getItem('authToken'),
            })
        };
        return this.http.get(url + "/check_cart", httpOptions);
    }

    checkOutCart(data) {
        const httpOptions = {
            headers: new HttpHeaders({
                'authId': localStorage.getItem('authId'),
                'authToken': localStorage.getItem('authToken'),
            })
        };
        return this.http.post(url + "/checkout", data, httpOptions);
    }



}