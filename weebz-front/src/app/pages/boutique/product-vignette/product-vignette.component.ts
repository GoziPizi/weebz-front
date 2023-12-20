import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-vignette',
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


}
