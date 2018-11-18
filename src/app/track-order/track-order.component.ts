import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-track-order',
  templateUrl: './track-order.component.html',
  styleUrls: ['./track-order.component.css']
})
export class TrackOrderComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    // Accepted -
    //   1 Assign to delivery boy -
    //     2(Preparing food) reached restarent -
    //       3(Food received) Started towards Customer -
    //         4(On the way) Food delivered -
    //           5(delivered)cash received -
    //             6(order completed) cancelled -
    //               10(Order canceled)
  }

}
