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

    console.log(JSON.parse(localStorage.getItem('item')));

    if (JSON.parse(localStorage.getItem('item'))) {
      this.cartItems = JSON.parse(localStorage.getItem('item'));
      this.checkCart();
    }

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
        let previousItem = JSON.parse(localStorage.getItem('item'));
        if (previousItem) {
          localStorage.removeItem('item');
          previousItem.push(obj);
          localStorage.setItem('item', JSON.stringify(previousItem))
        } else {
          let data = [obj];
          localStorage.setItem('item', JSON.stringify(data));

        }
        this.checkCart();
      } else {
        window.confirm(this.addToCartResponse.message)
      }


    }, err => {
      console.log(err);
    })
  }

  checkCart() {
    this.cartService.getCartItems().subscribe(data => {
      console.log(data);
      this.checkCartResponse = data;
      this.cartItems = JSON.parse(localStorage.getItem('item'));
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
      let allItems = JSON.parse(localStorage.getItem('item'));
      allItems.forEach(element => {
        if (element.food_id === id) {
          let index = allItems.indexOf(element);
          if (index > -1) {
            allItems.splice(index, 1);
            console.log(allItems);
          }
        }
      });
      localStorage.removeItem('item');
      localStorage.setItem('item', JSON.stringify(allItems))
      this.checkCart();

    }, err => {
      console.log(err);
    })
  }


  redirectToCart() {
    this.router.navigate(['/cart']);
  }

}
