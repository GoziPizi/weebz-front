import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ApiHandlerService } from 'src/app/services/api-handler.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-produit',
  templateUrl: './page-produit.component.html',
  styleUrls: ['./page-produit.component.scss']
})
export class PageProduitComponent implements OnInit {

  productId:number=0;
  product: Product = new Product();

  imagesToShowCarousel: string[] = [];

  constructor(
    private apiHandler: ApiHandlerService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.productId = Number(params.get('productId'));
    })
    this.fetchProductData();
  }

  fetchProductData() {
    this.apiHandler.getProductData(this.productId).subscribe(
      (res: Product) => {
        this.product = res;
        this.imagesToShowCarousel = [res.images[0],res.images[0],res.images[0]];
      }
    )
  }


  //getters for template 

  get shopId() {
    return this.product.shopId;
  }

  get productName() {
    return this.product.name;
  }
}
