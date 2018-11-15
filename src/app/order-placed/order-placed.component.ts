import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderService } from './../services/order.service';

@Component({
  selector: 'app-order-placed',
  templateUrl: './order-placed.component.html',
  styleUrls: ['./order-placed.component.css']
})
export class OrderPlacedComponent implements OnInit {
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



}
