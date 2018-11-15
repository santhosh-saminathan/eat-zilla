import { Component, OnInit } from '@angular/core';
import { ProfileService } from './../services/profile.service';
import { OrderService } from './../services/order.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userProfileDetails: any;
  profileResponse: any;

  constructor(private profileService: ProfileService, private orderService: OrderService) { }

  ngOnInit() {
    console.log("ngonint called")
    this.getProfileDetails();
    this.orderHistory();
  }

  getProfileDetails() {
    console.log("celle d ");
    this.profileService.getProfile().subscribe(data => {
      console.log(data);
      this.profileResponse = data;
      if (this.profileResponse.status) {
        this.userProfileDetails = this.profileResponse.data[0];
        console.log(this.userProfileDetails);
      }
    }, err => {
      console.log(err);
    })
  }

  orderHistory() {
    this.orderService.orderHistory().subscribe(data => {
      console.log(data);
    }, err => {
      console.log(err);
    })
  }

}