import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { ProductWithQty } from 'src/app/models/productWithQty';
import { LoadingServiceService } from 'src/app/services/loading-service.service';


@Component({
  selector: 'app-my-shopping-cart',
  templateUrl: './my-shopping-cart.component.html',
  styleUrls: ['./my-shopping-cart.component.scss']
})
export class MyShoppingCartComponent implements OnInit {

  isCartOpen: boolean = false;

  productsWithQty: ProductWithQty[] = [];

  shoppingServiceSubscription: any;

  constructor(
    public shoppingCartService: ShoppingCartService,
    public loadingService: LoadingServiceService
  ) { }

  ngOnInit(): void {
    this.shoppingServiceSubscription = this.shoppingCartService.getUpdateCartObservable().subscribe(() => {
      this.getProductsWithQty();
    });
  }

  ngOnDestroy(): void {
    this.shoppingServiceSubscription.unsubscribe();
  }

  getProductsWithQty() {
    this.productsWithQty = this.shoppingCartService.getCart();
  }

  //actions of the template
  openCart() {
    this.getProductsWithQty();
    this.isCartOpen = true;
  }

  closeCart() {
    this.isCartOpen = false;
  }

  onBuy() {
    this.loadingService.setLoadingState(true);
    this.shoppingCartService.onBuy().subscribe(() => {
      this.loadingService.setLoadingState(false);
      this.closeCart();
    });
  }

  //getters 

  get totalPrice(): string {
    let total = 0;
    this.productsWithQty.forEach(p => {
      total += p.product.price * p.quantity;
    });
    return total.toFixed(2);
  }

}
