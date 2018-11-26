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

    storeUserName(data) {
        localStorage.setItem('userName', data);
    }

    storeUserPic(data) {
        localStorage.setItem('userPic', data);
    }

    getAuthId() {
        return localStorage.getItem('authId');
    }

    getAuthToken() {
        return localStorage.getItem('authToken');
    }

    getUserName() {
        return localStorage.getItem('userName');
    }

    getUserPic() {
        return localStorage.getItem('userPic');
    }

    removeUserData() {
        localStorage.removeItem('authId');
        localStorage.removeItem('authToken');
        localStorage.removeItem('userName');
        localStorage.removeItem('userPic');
    }


}