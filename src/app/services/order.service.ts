
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
export class OrderService {

    constructor(private http: HttpClient) { }


    getDeliveryLocation() {
        return this.http.get(url + "/get_delivery_address", httpOptions);
    }

    addDeliveryAddress(data) {
        return this.http.post(url + "/add_delivery_address", data, httpOptions);
    }

    getDefaultAddress() {
        return this.http.get(url + "/get_default_address", httpOptions);

    }

    setDefaultAddress(data) {
        return this.http.post(url + "/set_delivery_address", data, httpOptions);

    }

    placeOrder(data) {
        return this.http.post(url + "/paynow", data, httpOptions);
    }

    orderHistory() {
        return this.http.get(url + "/order_history", httpOptions);
    }

    currentOrderStatus() {
        return this.http.get(url + "/get_current_order_status", httpOptions);
    }

    orderStatus() {
        return this.http.get(url + "/get_order_status", httpOptions);
    }

    trackOrderDetail(data) {
        return this.http.post(url + "/track_order_detail", data, httpOptions);

    }
}