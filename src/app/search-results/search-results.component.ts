import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RestaurantService } from './../services/restaurant.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  loading: boolean = true;
  lat: any;
  lng: any;
  nearbyRestaurants: any;

  constructor(private router: Router, private route: ActivatedRoute, private restaurantService: RestaurantService) { }

  ngOnInit() {

    console.log(this.route);

    this.lat = this.route.snapshot.queryParams['lat'];
    this.lng = this.route.snapshot.queryParams['lng'];

    console.log(this.lat, this.lng);


    this.restaurantService.getNearByRestaurants(this.lat, this.lng).subscribe(data => {
      console.log(data)
      this.nearbyRestaurants = data;
    }, err => {
      console.log(err);
    })

  }

  redirectToMenuDetail(id) {
    this.router.navigate(['/menu-details'], { queryParams: { restaurant: id } });

  }

}
