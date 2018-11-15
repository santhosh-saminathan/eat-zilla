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
    // this.orderService.currentOrderStatus().subscribe(data => {
    //   console.log(data);
    // }, err => {
    //   console.log(err);
    // })

    // this.orderService.orderHistory().subscribe(data => {
    //   console.log(data);
    // }, err => {
    //   console.log(err);
    // })
  }


  trackOrder() {
    console.log("Called")
    this.router.navigate(['/profile'])
  }


}
