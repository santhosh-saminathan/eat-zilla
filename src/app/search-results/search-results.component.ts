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
  displayGridView: boolean = true;
  displayListView: boolean = false;
  // copyNearbyRestaurants: any;

  constructor(private router: Router, private route: ActivatedRoute, private restaurantService: RestaurantService) {
  }

  ngOnInit() {

    this.lat = this.route.snapshot.queryParams['lat'];
    this.lng = this.route.snapshot.queryParams['lng'];

    console.log(this.lat, this.lng);


    this.restaurantService.getNearByRestaurants(this.lat, this.lng).subscribe(data => {
      console.log(data)
      this.nearbyRestaurants = data;
      // this.copyNearbyRestaurants = data;
    }, err => {
      console.error(err);
    })

  }

  redirectToMenuDetail(id) {
    this.router.navigate(['/menu-details'], { queryParams: { restaurant: id } });

  }

  gridView() {
    this.displayGridView = false;
    this.displayListView = true;
  }

  listView() {
    this.displayGridView = true;
    this.displayListView = false;
  }

  filterByRating(rating) {
    this.nearbyRestaurants.restaurants.forEach(element => {
      if (element.rating >= rating) {
        element.show = true;
      } else {
        element.hide = true;
      }
    });
  }
}
