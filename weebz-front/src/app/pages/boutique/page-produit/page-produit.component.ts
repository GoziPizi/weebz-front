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

  //starting position of the carousel. 0 = first image
  carouselIndex: number = 0;

  //main image index.
  mainImageIndex: number = 0;

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
      }
    )
  }

  //functions of the template

  onCarouselNext() {
    this.carouselIndex++;
    if (this.carouselIndex >= this.product.images.length) this.carouselIndex = 0;
  }

  onCarouselPrevious() {
    this.carouselIndex--;
    if (this.carouselIndex < 0) this.carouselIndex = this.product.images.length - 1;
  }

  onImageCarouselClick(image: string) {
    this.mainImageIndex = this.product.images.indexOf(image);
  }

  //getters for template 

  get shopId() {
    return this.product.shopId;
  }

  get productName() {
    return this.product.name;
  }

  get mainImage() {
    return this.product.images[this.mainImageIndex];
  }

  get imagesToShowCarousel() {
    //FIXME les imagees tournent mal
    const index0 = this.carouselIndex;
    const index1 = (this.carouselIndex + 1) % this.product.images.length;
    const index2 = (this.carouselIndex + 2) % this.product.images.length;
    return [this.product.images[index0], this.product.images[index1], this.product.images[index2]];
  }
}
