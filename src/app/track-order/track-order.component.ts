import { Component, OnInit } from '@angular/core';
import { OrderService } from './../services/order.service';
import { Router, ActivatedRoute } from '@angular/router';

declare var google;

@Component({
  selector: 'app-track-order',
  templateUrl: './track-order.component.html',
  styleUrls: ['./track-order.component.css']
})
export class TrackOrderComponent implements OnInit {
  trackingOrderResponse: any;
  orderId: any;
  orderStatus: number = 5;
  deliveryBoyDetails: any;

  constructor(private orderService: OrderService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.orderId = this.route.snapshot.queryParams['order-id'];

    this.orderService.trackOrderDetail({ request_id: this.orderId }).subscribe(data => {
      this.trackingOrderResponse = data;
      console.log(this.trackingOrderResponse)
      if (this.trackingOrderResponse.status) {
        // this.orderStatus = this.trackingOrderResponse.order_status[0].status;
        this.deliveryBoyDetails = this.trackingOrderResponse.order_status[0];


        var directionsDisplay = new google.maps.DirectionsRenderer;
        var directionsService = new google.maps.DirectionsService;
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 14,
        });
        directionsDisplay.setMap(map);


        this.calculateAndDisplayRoute(directionsService, directionsDisplay);

      }
    }, err => {
      console.log(err);
    })
  }

  calculateAndDisplayRoute(directionsService, directionsDisplay) {
    var selectedMode = 'DRIVING';
    directionsService.route({
      origin: { lat: this.trackingOrderResponse.order_status[0].restaurant_lat, lng: this.trackingOrderResponse.order_status[0].restaurant_lng },  // Haight.
      destination: { lat: this.trackingOrderResponse.order_status[0].user_lat, lng: this.trackingOrderResponse.order_status[0].user_lng },  // Ocean Beach.
      travelMode: google.maps.TravelMode[selectedMode]
    }, function (response, status) {
      if (status == 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }


}
