import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderService } from './../services/order.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {
  deliveryAddress: any = {};

  constructor(private router: Router, private orderService: OrderService) { }

  ngOnInit() {

    this.orderService.getDeliveryLocation().subscribe((data) => {
      console.log(data);
    }, err => {
      console.log(err);
    })
  }

  addAddress() {

    let data = {
      "address": "Tirupur",
      "lat": "12",
      "lng": "12",
      "type": "2"
    }

    console.log(this.deliveryAddress);
    this.orderService.addDeliveryAddress(data).subscribe((data) => {
      console.log(data);
    }, err => {
      console.log(err);
    })
  }

  redirectToPayment() {
    this.router.navigate(['/payment']);
  }
}
