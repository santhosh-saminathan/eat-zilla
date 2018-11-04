import { Injectable } from '@angular/core';

@Injectable()
export class WebStorageService {

    constructor() { }


    storeAuthId(data) {
        localStorage.setItem('authId', data);
    }

    storeAuthToken(data) {
        localStorage.setItem('authToken', data);
    }

    getAuthId() {
        return localStorage.getItem('authId');
    }

    getAuthToken() {
        return localStorage.getItem('authToken');
    }

    removeAuthId() {
        console.log("removed");
        localStorage.removeItem('authId');
    }

    removeAuthToken() {
        console.log("removed");
        localStorage.removeItem('authToken');
    }


}