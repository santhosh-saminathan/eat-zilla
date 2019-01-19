import { Component, OnInit } from '@angular/core';
import { MenuService } from './../services/menu.service';
import { CartService } from './../services/cart.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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

  food_variety: any = [];

  constructor(private toastr: ToastrService, private router: Router, private route: ActivatedRoute, private menuService: MenuService, private cartService: CartService) {
    this.restaurant_Id = this.route.snapshot.queryParams['restaurant'];
    if (!this.restaurant_Id) {
      this.router.navigate(['/search-results']);
    }
  }

  ngOnInit() {


    this.menuService.getFoodList({ 'restaurant_id': this.restaurant_Id, 'is_veg': 0 }).subscribe(data => {
      this.allCategories = data;
      this.checkCart();
      if (this.allCategories.status) {
        this.allCategories.food_list.forEach(element => {
          element.category_name = element.category_name.replace(/ /g, "-");
          let json = {
            'category': element.category_name,
            'count': element.items.length
          }
          this.food_variety.push(json);
        })
      } else {
        this.toastr.error('', 'Error while getting menu');
      }

    }, err => {
      this.toastr.error('', 'Error while getting menu');
    })

  }

  addToCart(food) {
    console.log(food);
    let quantity = 1;
    if (this.checkCartResponse && this.checkCartResponse.cart[0].item_list.length > 0)
      this.checkCartResponse.cart[0].item_list.forEach(element => {
        if (element.item_id === food.food_id) {
          quantity = element.quantity + quantity;
        }
      });
    let obj = {
      "food_id": food.food_id,
      "quantity": quantity,
      "restaurant_id": this.restaurant_Id,
      "force_insert": 0,
      'name': food.name,
      'price': food.price
    }

    this.cartService.addToCart(obj).subscribe(data => {
      this.addToCartResponse = data;
      if (this.addToCartResponse.status) {
        this.toastr.success('', 'Item Added Successfully to cart');
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
              this.toastr.success('', 'Item Added Successfully to cart');
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
      this.toastr.error('', 'Error while adding item');
      console.log(err);
    })
  }

  checkCart() {
    this.cartService.getCartItems().subscribe(data => {
      this.checkCartResponse = data;

      this.allCategories.food_list.forEach(allMenus => {
        allMenus.items.forEach(food => {
          // this.checkCartResponse.cart[0].item_list.forEach(cartItem => {
            // if (cartItem.item_id == food.food_id) {
              food.alreadyFound = false;
              food.cartCount = 0;
            // }
          // });
        });
      });

      this.allCategories.food_list.forEach(allMenus => {
        allMenus.items.forEach(food => {
          this.checkCartResponse.cart[0].item_list.forEach(cartItem => {
            if (cartItem.item_id == food.food_id) {
              food.alreadyFound = true;
              food.cartCount = cartItem.quantity;
            }
          });
        });
      });
      console.log(this.allCategories);
    }, err => {
      console.log(err);
    })
  }

  removeFromCart(id, quantity) {
    console.log(id,quantity);
    let newQuantity = quantity - 1;

    let data = {
      food_id: id,
      quantity: newQuantity
    }
    this.cartService.removeFromCart(data).subscribe(data => {
      this.toastr.success('', 'Item Removed from cart');
      this.checkCart();
    }, err => {
      this.toastr.error('', 'Error while Removing items in cart');
    })
  }


  redirectToCart() {
    if (this.checkCartResponse.cart["0"].quantity > 0) {
      this.router.navigate(['/cart'], { queryParams: { id: this.restaurant_Id } });
    } else {
      this.toastr.error('', 'Please add some items to cart');

    }
  }

  scrollTo(id) {
    let element = document.querySelector("#" + id);
    if (element) {
      element.scrollIntoView();
      window.scrollBy(0, -100);
    }
  }

}
