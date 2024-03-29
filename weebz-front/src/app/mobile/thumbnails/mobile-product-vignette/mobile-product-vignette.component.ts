import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-mobile-product-vignette',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './mobile-product-vignette.component.html',
  styleUrl: './mobile-product-vignette.component.scss'
})
export class MobileProductVignetteComponent {

  constructor(
    private router: Router
  ) {}

  @Input() product: Product = new Product();

  get name() {
    return this.product.name ? this.product.name : 'Nom du produit';
  }

  get price() {
    return this.product.price.toFixed(2);
  }

  get category() {
    if(this.product.category == 'BOOK') {
      return 'Livre';
    } 
    return 'Goodies';
  }

  get imageUrl() {
    return this.product.images ? this.product.images[0] : '';
  }
}
