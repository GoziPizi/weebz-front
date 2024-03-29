import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-vignette',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './product-vignette.component.html',
  styleUrls: ['./product-vignette.component.scss']
})
export class ProductVignetteComponent implements OnInit {

  @Input() product: Product = new Product();

  constructor() { }

  ngOnInit(): void {
  }

  //template getters

  get price() {
    return this.product.price.toFixed(2);
  }

  get category() {
    if(this.product.category == 'BOOK') {
      return 'Livre';
    }
    
    return 'Goodies';
  }
}