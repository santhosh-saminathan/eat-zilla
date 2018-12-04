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
  allAvailableDeliveryAddress: any;
  defaultAddress: any;
  newDeliveryAddress: any;
  setDeliveryAddr: any;
  setAddressResponse: any;
  checkCartResponse: any;
  restaurant_Id: any;
  addDeliveryAddressResponse: any;
  options: any;
  cartDetails: any;
  requiredField: boolean = true;


  constructor(private toastr: ToastrService, private router: Router, private route: ActivatedRoute, private orderService: OrderService, private cartService: CartService) { }

  @ViewChild("placesRef") placesRef: GooglePlaceDirective;


  ngOnInit() {
    this.restaurant_Id = this.route.snapshot.queryParams['id'];

    this.getAllDeliveryAddress();
    this.checkCart();
  }

  checkCart() {
    this.cartService.checkOutCart({ coupon_code: 'testcode' }).subscribe(data => {
      console.log(data);
      this.checkCartResponse = data;
      if (this.checkCartResponse.status) {
        this.cartDetails = this.checkCartResponse;
      } else {
        this.toastr.error('', 'No Item in cart');
      }
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
    if (this.newDeliveryAddress && this.deliveryAddress.flat_no && this.deliveryAddress.landmark) {
      let data = {
        "landmark": this.deliveryAddress.landmark,
        "flat_no": this.deliveryAddress.flat_no,
        "address": this.newDeliveryAddress.name + ',' + this.newDeliveryAddress.formatted_address,
        "lat": this.newDeliveryAddress.geometry.viewport.l.l,
        "lng": this.newDeliveryAddress.geometry.viewport.j.j,
        "type": "2"
      }

      this.setAddress(data);

      this.orderService.addDeliveryAddress(data).subscribe((data) => {
        this.addDeliveryAddressResponse = data;
        if (this.addDeliveryAddressResponse.status) {
          console.log(this.addDeliveryAddressResponse);
          // this.toastr.success('', 'Address Added Successfully');
          this.newDeliveryAddress = null;
          this.getAllDeliveryAddress();
        } else {
          this.toastr.error('', this.addDeliveryAddressResponse.message);
        }

      }, err => {
        console.log(err);
      })
    } else {
      this.requiredField = false;
    }


  }

  getAllDeliveryAddress() {

    this.orderService.getAllDeliveryLocations().subscribe((data) => {
      console.log(data);
      this.allAvailableDeliveryAddress = data;
      this.getDefaultAddress();// api error

    }, err => {
      console.log(err);
    })
  }

  setAddress(address) {

    if (address) {
      let data = {
        current_address: address.address,
        lat: address.lat,
        lng: address.lng,
        landmark: address.landmark,
        flat_no: address.flat_no
      }
      console.log(data);
      this.orderService.setDefaultAddress(data).subscribe((data) => {
        this.setAddressResponse = data;
        if (this.setAddressResponse) {
          this.toastr.success('', 'Address Added Successfully');
          this.getDefaultAddress();
          console.log(data);

        } else {
          this.toastr.error('', this.setAddressResponse.message || 'Error');
        }

      }, err => {
        console.log(err);
      })
    }

  }


  getDefaultAddress() {
    this.orderService.getDefaultAddress().subscribe((data) => {
      console.log(data);
      this.defaultAddress = data;
      this.allAvailableDeliveryAddress.data.forEach(element => {
        if (element.id === this.defaultAddress.data.id) {
          element.default = true;
        }
      });
    }, err => {
      console.log(err);
    })
  }

  redirectToPayment() {
    if (this.cartDetails) {
      this.router.navigate(['/payment']);
    } else {
      this.toastr.error('', 'Please add some Items before proceed');
    }

  }

  backToAddItems() {
    this.router.navigate(['/menu-details'], { queryParams: { restaurant: this.restaurant_Id } });

  }
}
