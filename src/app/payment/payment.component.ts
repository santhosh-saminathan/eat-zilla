import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderService } from './../services/order.service';
import { CartService } from './../services/cart.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  orderDetails: any;
  placeOrderResponse: any;

  constructor(private router: Router, private orderService: OrderService, private cartService: CartService) { }

  ngOnInit() {
    this.cartService.checkOutCart({ coupon_code: 'testcode' }).subscribe(data => {
      console.log(data);
      this.orderDetails = data
    }, err => {
      console.log(err);
    })
  }

  redirectToOrder() {
    let food_id_array = [];
    let food_qty_array = [];
    console.log("1st");
    this.orderDetails.food_detail.forEach(element => {
      food_id_array.push(element.food_id);
      food_qty_array.push(element.quantity);
    });
    console.log("2nd");
    let data = {
      restaurant_id: this.orderDetails.restaurant_detail[0].restaurant_id,
      item_total: this.orderDetails.invoice[0].item_total,
      offer_discount: this.orderDetails.invoice[0].offer_discount,
      restaurant_packaging_charge: this.orderDetails.invoice[0].restaurant_packaging_charge,
      gst: this.orderDetails.invoice[0].gst,
      delivery_charge: this.orderDetails.invoice[0].delivery_charge,
      bill_amount: this.orderDetails.invoice[0].bill_amount,
      coupon_code: this.orderDetails.invoice[0].coupon_code,
      food_id: food_id_array.join(),
      food_qty: food_qty_array.join(),
      paid_type: 1,
    }

    this.orderService.placeOrder(data).subscribe(data => {
      console.log(data);
      this.placeOrderResponse = data;
      if (this.placeOrderResponse.status) {
        this.router.navigate(['/order-confirmed']);
      }
    }, err => {
      console.log(err);
    })
  }

}
