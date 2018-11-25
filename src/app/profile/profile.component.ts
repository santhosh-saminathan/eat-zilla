import { Component, OnInit } from '@angular/core';
import { ProfileService } from './../services/profile.service';
import { OrderService } from './../services/order.service';
import { Router, ActivatedRoute } from '@angular/router';


import { ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @ViewChild('avatar') avatar: ElementRef;

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


  constructor(private http: HttpClient, private profileService: ProfileService, private orderService: OrderService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getProfileDetails();
    this.orderHistory();
  }

  userPic(image) {

    console.log(image)
    console.log(image);
    let content = new FormData();
    console.log(content);
    content.append('pic', image[0]);

    console.log(content);


    let obj = {
      'profile_image': content,
      'name': this.userProfileDetails.name,
      'email': this.userProfileDetails.email,
      'id': this.userProfileDetails.id,
    }
    this.profileService.updateProfile(obj).subscribe(data => {
      console.log(data);
    }, err => {
      console.log(err);
    })

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


    if (this.avatar.nativeElement.files[0]) {


      const formData = new FormData();
      formData.append('profile_image',
        this.avatar.nativeElement.files[0],
        this.avatar.nativeElement.files[0].name);

      formData.append('id', this.userProfileDetails.id);
      formData.append('name', this.userProfileDetails.name);
      formData.append('email', this.userProfileDetails.email);



      const headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/json');
      this.http.post('http://54.218.62.130/eatzilla/api/update_profile', formData, { headers: headers })
        .subscribe(
        (response) => {
          console.log(response);
          this.getProfileDetails();
        },
        (error) => {
          console.log(error);
        }
        );

    } else if (this.userProfileDetails.name && this.userProfileDetails.email) {

      let obj = {
        'id': this.userProfileDetails.id,
        'name': this.userProfileDetails.name,
        'email': this.userProfileDetails.email
      }

      this.profileService.updateProfile(obj).subscribe(data => {
        console.log(data);
        this.getProfileDetails();
      }, err => {
        console.log(err);
      })
    }



  }

}