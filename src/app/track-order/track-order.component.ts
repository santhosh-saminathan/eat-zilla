import { Component, OnInit } from '@angular/core';
import { OrderService } from './../services/order.service';

declare var google;

@Component({
  selector: 'app-track-order',
  templateUrl: './track-order.component.html',
  styleUrls: ['./track-order.component.css']
})
export class TrackOrderComponent implements OnInit {

  constructor(private orderService: OrderService) { }

  ngOnInit() {

    this.orderService.currentOrderStatus().subscribe(data => {
      console.log(data);
    }, err => {
      console.log(err);
    })


    this.orderService.trackOrderDetail({ request_id: 111 }).subscribe(data => {
      console.log(data);
      // this.trackingOrderResponse = data;
      // element.trackingDetails = this.trackingOrderResponse.tracking_detail;
    }, err => {
      console.log(err);
    })

    // var source = { lat: 11.3, lng: 77.6 }

    // var map;
    // map = new google.maps.Map(document.getElementById('map'), {
    //   center: source,
    //   zoom: 8,
    //   mapTypeId: 'roadmap'
    // });


    // var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
    // var icons = {
    //   restaurant: {
    //     name: 'Restaurant',
    //     icon: iconBase + 'parking_lot_maps.png'
    //   },
    // }

    // var marker = new google.maps.Marker({
    //   position: source,
    //   icon: icons['restaurant'].icon,
    //   map: map
    // });



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
