import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ApiHandlerService } from 'src/app/services/api-handler.service';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { LoadingServiceService } from 'src/app/services/loading-service.service';

@Component({
  selector: 'app-page-produit',
  templateUrl: './page-produit.component.html',
  styleUrls: ['./page-produit.component.scss']
})
export class PageProduitComponent implements OnInit {

  productId:number=0;
  product: Product = new Product();
  product$: BehaviorSubject<Product> = new BehaviorSubject<Product>(new Product());
  reload$: BehaviorSubject<void> = new BehaviorSubject<void>(undefined);

  //starting position of the carousel. 0 = first image
  carouselIndex: number = 0;
  isCarouselDisplayed: boolean = true;

  //main image index.
  mainImageIndex: number = 0;

  constructor(
    private apiHandler: ApiHandlerService,
    private route: ActivatedRoute,
    public loadingService: LoadingServiceService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.loadingService.setLoadingState(true);
      window.scrollTo(0, 0);
      this.productId = Number(params.get('productId'));
      this.fetchProductData().add(() => {
        this.loadingService.setLoadingState(false);
      });
    })
  }

  fetchProductData() {
    return this.apiHandler.getProductData(this.productId).subscribe(
      (res: Product) => {
        this.product = res;
        if(this.product.images.length <= 1) this.isCarouselDisplayed = false;
        else this.isCarouselDisplayed = true;
        this.product$.next(res);
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

  onBuy() {
    this.loadingService.setLoadingState(true);
    this.apiHandler.getSessionFromProduct(this.product.id).subscribe({
      next: (res: any) => {
        window.location.href = res.url;
      },
      error: err => {
        console.log(err);
      },
      complete: () => {
        this.loadingService.setLoadingState(false);
      }
    })
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
    const index0 = this.carouselIndex;
    const index1 = (this.carouselIndex + 1) % this.product.images.length;
    const index2 = (this.carouselIndex + 2) % this.product.images.length;
    if(this.product.images.length === 1) return [this.product.images[index0]];
    if(this.product.images.length === 2) return [this.product.images[index0], this.product.images[index1]];
    return [this.product.images[index0], this.product.images[index1], this.product.images[index2]];
  }

  get productPrice() {
    return this.product.price.toFixed(2);
  }
}
