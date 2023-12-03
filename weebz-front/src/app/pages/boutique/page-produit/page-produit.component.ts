import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-produit',
  templateUrl: './page-produit.component.html',
  styleUrls: ['./page-produit.component.scss']
})
export class PageProduitComponent implements OnInit {

  productId:number=0;
  productName:string="productName";
  productPrice:number=0;
  productDescription:string="lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur";
  productImages:string[]=[
    "/assets/fixtures/products/product1.png",
    "/assets/fixtures/products/product2.png",
    "/assets/fixtures/products/product3.png",
  ];
  currentProductImage=0;
  backgroundImage:string="/assets/Backgroundweebz.png"

  constructor() { }

  ngOnInit(): void {
  }

  onLeftArrow() {
    this.currentProductImage = this.currentProductImage - 1;
    if(this.currentProductImage < 0) {
      this.currentProductImage = this.productImages.length - 1;
    }
  }

  onRightArrow() {
    this.currentProductImage = (this.currentProductImage + 1) % this.productImages.length;
  }

}
