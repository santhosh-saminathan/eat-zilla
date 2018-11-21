import { Component, OnInit } from '@angular/core';
import { ProfileService } from './../services/profile.service';
import { OrderService } from './../services/order.service';
import { Router, ActivatedRoute } from '@angular/router';

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
  category: any
  fileToUpload: File = null;


  constructor(private profileService: ProfileService, private orderService: OrderService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getProfileDetails();
    this.orderHistory();
  }

  userPic(image) {

    console.log(image)
    console.log(image);
    let input = new FormData();
    console.log(input);
    console.log(image[0]);


    // let obj = {
    //   'profile_image': input.append('profile_image', image[0]),
    //   'name': this.userProfileDetails.name,
    //   'email': this.userProfileDetails.email,
    //   'id': this.userProfileDetails.id,
    // }
    // this.profileService.updateProfile(obj).subscribe(data => {
    //   console.log(data);
    // }, err => {
    //   console.log(err);
    // })

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

  trackOrder(order_id) {
    console.log(order_id);
    this.router.navigate(['/track-order'], { queryParams: { 'order-id': order_id } });
  }
  orderHistory() {

    this.orderService.currentOrderStatus().subscribe(data => {
      this.currentOrderStatus = data;
      console.log(this.currentOrderStatus);
      // this.currentOrderStatus.order_status.forEach(element => {
      //   this.orderService.trackOrderDetail({ request_id: element.request_id }).subscribe(data => {
      //     this.trackingOrderResponse = data;
      //     element.trackingDetails = this.trackingOrderResponse.tracking_detail;
      //   }, err => {
      //     console.log(err);
      //   })
      // });
    }, err => {
      console.log(err);
    })

    this.orderService.orderHistory().subscribe(data => {
      this.orderHistoryResponse = data;
      console.log(this.orderHistoryResponse);
      this.pastOrderArray = this.orderHistoryResponse.past_orders ? this.orderHistoryResponse.past_orders : null;
      // console.log(this.pastOrderArray);
      // this.currentOrders = this.orderHistoryResponse.upcoming_orders ? this.orderHistoryResponse.upcoming_orders : [];
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