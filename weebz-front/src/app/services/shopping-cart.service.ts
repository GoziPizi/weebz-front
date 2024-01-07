import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { ProductWithQty } from '../models/productWithQty';
import { ApiHandlerService } from './api-handler.service';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  shoppingCart: ProductWithQty[] = [];

  updateCart$ = new Subject<void>();

  constructor(
    private apiHandlerService: ApiHandlerService
  ) {
    this.loadCartFromCookies();
  }

  loadCartFromCookies() {
    let cart = JSON.parse(localStorage.getItem('shoppingCart') ?? '[]');
    if (cart && Array.isArray(cart)) {
      this.shoppingCart = cart;
    } else {
      this.shoppingCart = [];
    }
  }

  saveCartToCookies() {
    localStorage.setItem('shoppingCart', JSON.stringify(this.shoppingCart));
  }

  addToCart(product: Product, quantity: number) {
    //check if product is already in cart
    let index = this.shoppingCart.findIndex(p => p.product.id == product.id);
    if (index > -1) {
      this.shoppingCart[index].quantity += quantity;
      if (this.shoppingCart[index].quantity <= 0) {
        this.shoppingCart.splice(index, 1);
      }
      this.saveCartToCookies();
      this.updateCart$.next();
      return;
    }
    let productWithQty = new ProductWithQty();
    productWithQty.product = product;
    productWithQty.quantity = quantity;
    this.shoppingCart.push(productWithQty);
    this.saveCartToCookies();
    this.updateCart$.next();
  }

  updateQuantity(product: Product, quantity: number) {
    let index = this.shoppingCart.findIndex(p => p.product.id == product.id);
    if (index > -1) {
      this.shoppingCart[index].quantity = quantity;
      this.saveCartToCookies();
    }
    this.updateCart$.next();
  }

  removeFromCart(product: Product) {
    let index = this.shoppingCart.findIndex(p => p.product.id == product.id);
    if (index > -1) {
      this.shoppingCart.splice(index, 1);
      this.saveCartToCookies();
    }
    this.updateCart$.next();
  }

  clearCart() {
    this.shoppingCart = [];
    this.saveCartToCookies();
    this.updateCart$.next();
  }

  onBuy(): Observable<any> {
    let observable = this.apiHandlerService.getMultipleProductsSession(this.shoppingCart);
    observable.subscribe({
      next: (res: any) => {
        window.location.href = res.url;
      }
    });
    return observable;
  }

  getCart(): ProductWithQty[] {
    return this.shoppingCart;
  }

  getUpdateCartObservable() {
    return this.updateCart$.asObservable();
  }
}
