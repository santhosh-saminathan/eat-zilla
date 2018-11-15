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
  pastOrders: any;
  currentOrders: any;

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
      this.pastOrders = this.orderHistoryResponse.past_orders;
      this.currentOrders = this.orderHistoryResponse.upcoming_orders;
    }, err => {
      console.log(err);
    })
  }

}