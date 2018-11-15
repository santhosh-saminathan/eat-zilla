import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderService } from './../services/order.service';
import { GooglePlaceDirective } from 'node_modules/ngx-google-places-autocomplete/ngx-google-places-autocomplete.directive';
import { Address } from 'node_modules/ngx-google-places-autocomplete/objects/address';
import { ToastrService } from 'ngx-toastr';
import { CartService } from './../services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {
  deliveryAddress: any = {};
  newDeliveryAddress: any;
  setDeliveryAddr: any;
  checkCartResponse: any;
  restaurant_Id: any;
  addDeliveryAddressResponse: any;
  options: any;

  constructor(private toastr: ToastrService, private router: Router, private route: ActivatedRoute, private orderService: OrderService, private cartService: CartService) { }

  @ViewChild("placesRef") placesRef: GooglePlaceDirective;


  ngOnInit() {
    // this.getDefaultAddress();// api error
    this.restaurant_Id = this.route.snapshot.queryParams['id'];

    this.getDeliveryAddress();
    this.checkCart();
  }

  checkCart() {
    this.cartService.checkOutCart({ coupon_code: 'testcode' }).subscribe(data => {
      console.log(data);
      this.checkCartResponse = data;
    }, err => {
      console.log(err);
    })
  }

  removeFromCart(id, quantity) {
    let newQuantity = quantity - 1;

    let data = {
      food_id: id,
      quantity: newQuantity
    }
    this.cartService.removeFromCart(data).subscribe(data => {
      console.log(data);
      this.toastr.success('', 'Removed Item Successfully');
      this.checkCart();

    }, err => {
      console.log(err);
    })
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
        this.addDeliveryAddressResponse = data;
        if (this.addDeliveryAddressResponse.status) {
          this.toastr.success('', 'Address Added Successfully');
          this.newDeliveryAddress = null;
          this.getDeliveryAddress();
        } else {
          this.toastr.error('', this.addDeliveryAddressResponse.message);
        }

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

  backToAddItems() {
    this.router.navigate(['/menu-details'], { queryParams: { restaurant: this.restaurant_Id } });

  }
}
