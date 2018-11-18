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
  orderHistoryResponse: any;
  pastOrderArray: any = [];
  currentOrders: any = [];
  // updateUserProfile:any

  currentOrderStatus: any;
  trackingOrderResponse: any;

  constructor(private profileService: ProfileService, private orderService: OrderService) { }

  ngOnInit() {
    this.getProfileDetails();
    this.orderHistory();
  }



  getProfileDetails() {
    this.profileService.getProfile().subscribe(data => {
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

    this.orderService.currentOrderStatus().subscribe(data => {
      this.currentOrderStatus = data;
      this.currentOrderStatus.order_status.forEach(element => {
        this.orderService.trackOrderDetail({ request_id: element.request_id }).subscribe(data => {
          this.trackingOrderResponse = data;
          element.trackingDetails = this.trackingOrderResponse.tracking_detail;
        }, err => {
          console.log(err);
        })
      });
    }, err => {
      console.log(err);
    })

    this.orderService.orderHistory().subscribe(data => {
      this.orderHistoryResponse = data;
      console.log(this.orderHistoryResponse);
      this.pastOrderArray = this.orderHistoryResponse.past_orders ? this.orderHistoryResponse.past_orders : null;
      console.log(this.pastOrderArray);
      this.currentOrders = this.orderHistoryResponse.upcoming_orders ? this.orderHistoryResponse.upcoming_orders : [];
    }, err => {
      console.log(err);
    })
  }

  updateProfile() {
    console.log(this.userProfileDetails);
    let obj = {
      'profile_image': this.userProfileDetails.profile_image,
      'name': this.userProfileDetails.name,
      'email': this.userProfileDetails.email,
      'id': this.userProfileDetails.id,
      'password': 'new password'
    }
    this.profileService.updateProfile(obj).subscribe(data => {
      console.log(data);
    }, err => {
      console.log(err);
    })
  }

}