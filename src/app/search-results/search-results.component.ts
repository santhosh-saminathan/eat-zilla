import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RestaurantService } from './../services/restaurant.service';
import { ToastrService } from 'ngx-toastr';

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
  searchRestaurant: any = '';
  updateFavouriteResponse: any;

  food_type: any = [];
  foof_type_count: any = [];

  filter_data: any = [];

  constructor(private toastr: ToastrService, private router: Router, private route: ActivatedRoute, private restaurantService: RestaurantService) {
  }

  updateFavourite(restaurant) {
    this.restaurantService.updateFavoriteRestaurant({ restaurant_id: restaurant.id }).subscribe(data => {
      console.log(data);
      this.updateFavouriteResponse = data;
      if (this.updateFavouriteResponse.status) {

        restaurant.is_favourite = 1 - restaurant.is_favourite;
        this.toastr.success('', this.updateFavouriteResponse.message);

      } else {
        this.toastr.error('', 'Error while updating Favourite list');
      }
    }, err => {
      console.log(err)
      this.toastr.error('', 'Error while updating Favourite list');

    })
  }

  ngOnInit() {

    this.lat = this.route.snapshot.queryParams['lat'];
    this.lng = this.route.snapshot.queryParams['lng'];

    console.log(this.lat, this.lng);


    this.restaurantService.getNearByRestaurants(this.lat, this.lng).subscribe(data => {
      console.log(data)
      this.nearbyRestaurants = data;
      let all_item_count = 0;
      this.nearbyRestaurants.restaurants.forEach(restaurant => {
        // console.log(restaurant);
        restaurant.cuisines.forEach(element => {
          all_item_count++;
          let json = {
            'food': element.name,
            'count': 1
          }
          var index = this.food_type.findIndex(item => item.food == element.name)
          console.log(element.name);
          if (index === -1) {
            this.food_type.push(json)
          }
          else {
            this.food_type[index].count += 1;
            console.log("object already exists", index)
          }


        });
      });
      this.food_type.push({ 'food': 'All', 'count': all_item_count });
      console.log(this.food_type);

      this.sortByRanking(0)

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

  addFilters(event, data) {

    if (event.target.checked) {
      this.filter_data.push(data)
    } else {
      var index = this.filter_data.indexOf(data);
      if (index > -1) {
        this.filter_data.splice(index, 1);
      }
    }

    if (this.filter_data.length == 0) {
      this.nearbyRestaurants.restaurants.forEach(element => {
        element.hide = false;
      })
    } else {
      this.nearbyRestaurants.restaurants.forEach(element => {
        element.hide = true;
      })

      this.filter_data.forEach(filterType => {
        if (typeof (filterType) == "number") {
          this.nearbyRestaurants.restaurants.forEach(element => {
            if (element.rating >= filterType) {
              element.hide = false;
            }
          });
        } else if (typeof (filterType) == "string") {
          this.nearbyRestaurants.restaurants.forEach(element => {
            var index = element.cuisines.findIndex(cuisine => cuisine.name == filterType)
            if (index != -1) {
              element.hide = false;
            }
          });
        }
      });
    }




  }

  sortByRanking(value) {
    if (value == 0) {
      this.nearbyRestaurants.restaurants.sort(function (a, b) {
        return b.rating - a.rating;
      })
    }
    if (value == 1) {
      this.nearbyRestaurants.restaurants.sort(function (a, b) {
        return a.rating - b.rating;
      })
    }
  }
}
