import { Component, OnInit } from '@angular/core';
import { MenuService } from './../services/menu.service';
import { CartService } from './../services/cart.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu-details',
  templateUrl: './menu-details.component.html',
  styleUrls: ['./menu-details.component.css']
})
export class MenuDetailsComponent implements OnInit {
  allCategories: any;
  restaurant_Id: any;
  addToCartResponse: any;
  cartItems: any;
  checkCartResponse: any;

  constructor(private router: Router, private route: ActivatedRoute, private menuService: MenuService, private cartService: CartService) { }

  ngOnInit() {



    this.checkCart();


    this.restaurant_Id = this.route.snapshot.queryParams['restaurant'];
    // let obj = {
    //   restaurant_id: this.restaurant_Id
    // }
    // this.menuService.getMenus(obj).subscribe(data => {
    //   console.log(data);
    // }, err => {
    //   console.log(err);
    // })



    this.menuService.getCategory(this.restaurant_Id).subscribe(data => {
      this.allCategories = data;
      console.log(this.allCategories);
      this.allCategories.category.forEach(element => {
        let obj2 = {
          restaurant_id: this.restaurant_Id,
          category_id: element.category_id,
          veg_only: 0
        }
        this.menuService.getCategoryWiseMenu(obj2).subscribe(data => {
          element.items = data;
        }, err => {
          console.log(err);
        })
      });
    }, err => {
      console.log(err);
    })



  }

  addToCart(food) {
    let obj = {
      "food_id": food.food_id,
      "quantity": 1,
      "restaurant_id": this.restaurant_Id,
      "force_insert": 0,
      'name': food.name,
      'price': food.price
    }

    this.cartService.addToCart(obj).subscribe(data => {
      this.addToCartResponse = data;
      if (this.addToCartResponse.status) {
        this.checkCart();
      } else {
        if (window.confirm(this.addToCartResponse.message)) {
          let obj = {
            "food_id": food.food_id,
            "quantity": 1,
            "restaurant_id": this.restaurant_Id,
            "force_insert": 1,
            'name': food.name,
            'price': food.price
          }

          this.cartService.addToCart(obj).subscribe(data => {
            this.addToCartResponse = data;
            if (this.addToCartResponse.status) {
              this.checkCart();
            } else {
              console.log("error");
            }
          }, err => {
            console.log(err);
          })

        }
      }
    }, err => {
      console.log(err);
    })
  }

  checkCart() {
    this.cartService.getCartItems().subscribe(data => {
      console.log(data);
      this.checkCartResponse = data;
    }, err => {
      console.log(err);
    })
  }

  removeFromCart(id, quantity) {
    let data = {
      food_id: id,
      quantity: quantity
    }
    this.cartService.removeFromCart(data).subscribe(data => {
      console.log(data);
      this.checkCart();

    }, err => {
      console.log(err);
    })
  }


  redirectToCart() {
    this.router.navigate(['/cart']);
  }

}
