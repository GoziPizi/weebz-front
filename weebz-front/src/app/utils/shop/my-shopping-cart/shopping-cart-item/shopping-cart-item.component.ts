import { Component, Input, OnInit } from '@angular/core';
import { ProductWithQty } from 'src/app/models/productWithQty';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart-item',
  standalone: true,
  templateUrl: './shopping-cart-item.component.html',
  styleUrls: ['./shopping-cart-item.component.scss']
})
export class ShoppingCartItemComponent implements OnInit {

  @Input() productWithQty: ProductWithQty = new ProductWithQty();

  constructor(
    public shoppingCartService: ShoppingCartService
  ) { }

  ngOnInit(): void {
  }

  onRemove() {
    this.shoppingCartService.removeFromCart(this.productWithQty.product);
  }

  addQuantity() {
    this.shoppingCartService.addToCart(this.productWithQty.product, 1);
  }

  substractQuantity() {
    this.shoppingCartService.addToCart(this.productWithQty.product, -1);
  }

  get totalPrice(): number {
    return this.productWithQty.product.price * this.productWithQty.quantity;
  }

}
