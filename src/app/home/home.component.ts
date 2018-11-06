import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { GooglePlaceDirective } from 'node_modules/ngx-google-places-autocomplete/ngx-google-places-autocomplete.directive';
import { Address } from 'node_modules/ngx-google-places-autocomplete/objects/address';
import { RestaurantService } from './../services/restaurant.service';
import { WebStorageService } from './../services/web-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loading: boolean = true;
  baseUrl: any;
  popularBrands: any;
  geometry: any;
  options:any; 


  constructor(private router: Router, private location: Location, private webStorageService: WebStorageService, private restaurantService: RestaurantService) { }

  ngOnInit() {
    // this.baseUrl = this.location;
    // setTimeout(() => {
    //   this.loading = false;
    // }, 1000);

    if (this.webStorageService.getAuthId() && this.webStorageService.getAuthToken()) {
      this.getPopularRestaurants();
    }

  }


  @ViewChild("placesRef") placesRef: GooglePlaceDirective;

  public handleAddressChange(address: Address) {
    // Do some stuff
    console.log(address);
    this.geometry = address.geometry.viewport;
    console.log(this.geometry.l.l);
  }

  redirectToSearchResult() {
    this.router.navigate(['/search-results'], { queryParams: { lat: '1234', lng: '212' } });
  }

  redirectToRestaurantDetail() {
    let url = this.baseUrl._platformStrategy._platformLocation.location.origin + "/restaurant-detail"
    window.open(url);
  }

  getPopularRestaurants() {
    this.restaurantService.getPopularBrands().subscribe(data => {
      console.log(data);
      this.popularBrands = data;
      this.popularBrands.data.forEach(element => {
        element.image = this.popularBrands.base_url + element.image;
      });
    }, err => {
      console.log(err);
    })
  }

}
