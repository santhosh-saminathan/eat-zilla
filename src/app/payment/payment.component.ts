import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderService } from './../services/order.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  orderDetails: any;

  constructor(private router: Router, private orderService: OrderService) { }

  ngOnInit() {
    this.orderService.checkoutCart().subscribe(data => {
      console.log(data);
      this.orderDetails = data
    }, err => {
      console.log(err);
    })
  }

  redirectToOrder() {
    this.router.navigate(['/order-confirmed']);
  }

}
