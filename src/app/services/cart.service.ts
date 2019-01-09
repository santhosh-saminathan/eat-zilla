
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

let url = environment.apiUrl;
let deviceToken = environment.deviceToken;

@Injectable()
export class CartService {

    constructor(private http: HttpClient) { }


    addToCart(data) {
        // const httpOptions = {
        //     headers: new HttpHeaders({
        //         'authId': localStorage.getItem('authId'),
        //         'authToken': localStorage.getItem('authToken'),
        //     })
        // };
        data.authId = localStorage.getItem('authId');
        data.authToken = localStorage.getItem('authToken');
        return this.http.post(url + "/add_to_cart", data);
    }

    removeFromCart(data) {
        // const httpOptions = {
        //     headers: new HttpHeaders({
        //         'authId': localStorage.getItem('authId'),
        //         'authToken': localStorage.getItem('authToken'),
        //     })
        // };
        data.authId = localStorage.getItem('authId');
        data.authToken = localStorage.getItem('authToken');
        return this.http.post(url + "/reduce_from_cart", data);
    }

    getCartItems() {
        // const httpOptions = {
        //     headers: new HttpHeaders({
        //         'authId': localStorage.getItem('authId'),
        //         'authToken': localStorage.getItem('authToken'),
        //     })
        // };
        // return this.http.get(url + "/check_cart", httpOptions);
        return this.http.get(url + "/check_cart?authId="+localStorage.getItem('authId')+"&authToken="+localStorage.getItem('authToken'));

    }

    checkOutCart(data) {
        // const httpOptions = {
        //     headers: new HttpHeaders({
        //         'authId': localStorage.getItem('authId'),
        //         'authToken': localStorage.getItem('authToken'),
        //     })
        // };
        data.authId = localStorage.getItem('authId');
        data.authToken = localStorage.getItem('authToken');
        return this.http.post(url + "/checkout", data);
    }



}