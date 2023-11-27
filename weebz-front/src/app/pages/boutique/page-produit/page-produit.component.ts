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
  productDescription:string="productDescription";
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
    console.log(this.currentProductImage);
  }

}
