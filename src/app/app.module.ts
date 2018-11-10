import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SearchComponent } from './search/search.component';
import { HelpComponent } from './help/help.component';
import { ProfileComponent } from './profile/profile.component';
import { CartDetailsComponent } from './cart-details/cart-details.component';
import { PaymentComponent } from './payment/payment.component';
import { OrderPlacedComponent } from './order-placed/order-placed.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactComponent } from './contact/contact.component';
import { MenuDetailsComponent } from './menu-details/menu-details.component';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { SearchResultsComponent } from './search-results/search-results.component';

//services
import { SignUpService } from './services/signup.service';
import { MenuService } from './services/menu.service';
import { CartService } from './services/cart.service';
import { ProfileService } from './services/profile.service';
import { WebStorageService } from './services/web-storage.service';
import { RestaurantService } from './services/restaurant.service';
import { OrderService } from './services/order.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    SearchComponent,
    HelpComponent,
    ProfileComponent,
    CartDetailsComponent,
    PaymentComponent,
    OrderPlacedComponent,
    AboutUsComponent,
    ContactComponent,
    MenuDetailsComponent,
    RestaurantDetailComponent,
    SearchResultsComponent
  ],
  imports: [
    GooglePlaceModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    BrowserAnimationsModule,
    AngularFontAwesomeModule,
    ToastrModule.forRoot()
  ],
  providers: [SignUpService, MenuService, CartService, ProfileService, WebStorageService, RestaurantService, OrderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
