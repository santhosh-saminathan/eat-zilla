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
  orderStatus: any;

  constructor(private orderService: OrderService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    // this.orderId = this.route.snapshot.queryParams['order-id'];

    // this.orderService.trackOrderDetail({ request_id: this.orderId }).subscribe(data => {
    //   this.trackingOrderResponse = data;
    //   console.log(this.trackingOrderResponse)
    //   if(this.trackingOrderResponse.status){
    //     // this.orderStatus = this.trackingOrderResponse
    //   }
    // }, err => {
    //   console.log(err);
    // })
    this.orderStatus = 4;


    var directionsDisplay = new google.maps.DirectionsRenderer;
    var directionsService = new google.maps.DirectionsService;
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 14,
      // center: { lat: 37.77, lng: -122.447 }
    });
    directionsDisplay.setMap(map);


    calculateAndDisplayRoute(directionsService, directionsDisplay);



    function calculateAndDisplayRoute(directionsService, directionsDisplay) {
      var selectedMode = 'DRIVING';
      directionsService.route({
        origin: { lat: 11.020522, lng: 76.966698 },  // Haight.
        destination: { lat: 11.0332, lng: 77.0339 },  // Ocean Beach.
        // Note that Javascript allows us to access the constant
        // using square brackets and a string value as its
        // "property."
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


}
