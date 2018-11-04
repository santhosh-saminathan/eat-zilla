import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
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

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'help', component: HelpComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'cart', component: CartDetailsComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'order-confirmed', component: OrderPlacedComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'menu-details', component: MenuDetailsComponent },
  { path: 'restaurant-detail', component: RestaurantDetailComponent },
  { path: 'search-results', component: SearchResultsComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
