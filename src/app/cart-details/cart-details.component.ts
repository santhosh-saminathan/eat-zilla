import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderService } from './../services/order.service';
import { GooglePlaceDirective } from 'node_modules/ngx-google-places-autocomplete/ngx-google-places-autocomplete.directive';
import { Address } from 'node_modules/ngx-google-places-autocomplete/objects/address';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {
  deliveryAddress: any = {};
  newDeliveryAddress: any;
  setDeliveryAddr: any;

  constructor(private toastr: ToastrService, private router: Router, private orderService: OrderService) { }

  @ViewChild("placesRef") placesRef: GooglePlaceDirective;


  ngOnInit() {
    // this.getDefaultAddress();// api error
    this.getDeliveryAddress();
  }


  newAddress(address: Address) {
    // Do some stuff
    this.newDeliveryAddress = address;
    console.log(this.newDeliveryAddress.name + ',' + this.newDeliveryAddress.formatted_address);
    console.log(this.newDeliveryAddress.geometry.viewport.l.l);
    console.log(this.newDeliveryAddress.geometry.viewport.j.j);
  }

  addAddress() {
    if (this.newDeliveryAddress) {
      let data = {
        "address": this.newDeliveryAddress.name + ',' + this.newDeliveryAddress.formatted_address,
        "lat": this.newDeliveryAddress.geometry.viewport.l.l,
        "lng": this.newDeliveryAddress.geometry.viewport.j.j,
        "type": "2"
      }

      this.orderService.addDeliveryAddress(data).subscribe((data) => {
        this.toastr.success('', 'Address Added Successfully');
        this.newDeliveryAddress = null;

      }, err => {
        console.log(err);
      })
    }


  }

  getDeliveryAddress() {
    this.orderService.getDeliveryLocation().subscribe((data) => {
      console.log(data);
      this.deliveryAddress = data;
    }, err => {
      console.log(err);
    })
  }

  setAddress(address) {
    console.log(address)
    if (address) {
      let data = {
        current_address: address.address,
        lat: address.lat,
        lng: address.lng
      }
      this.orderService.setDefaultAddress(data).subscribe((data) => {
        console.log(data);
      }, err => {
        console.log(err);
      })
    }

  }


  getDefaultAddress() {
    this.orderService.getDefaultAddress().subscribe((data) => {
      console.log(data);
    }, err => {
      console.log(err);
    })
  }

  redirectToPayment() {
    this.router.navigate(['/payment']);
  }
}
