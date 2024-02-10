import { Component, OnInit, ViewChild, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Product } from 'src/app/models/product';
import { ApiHandlerService } from 'src/app/services/api-handler.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { LoadingServiceService } from 'src/app/services/loading-service.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { MyShoppingCartComponent } from 'src/app/utils/shop/my-shopping-cart/my-shopping-cart.component';
import { CommentsDisplayerComponent } from 'src/app/utils/comments/comments-displayer/comments-displayer.component';
import { DeviceDetectorService } from 'ngx-device-detector';
import { PageProduitSimilarProductComponent } from './page-produit-similar-product/page-produit-similar-product.component';
import { CommonModule } from '@angular/common';
import { register as registerSwiperElements } from 'swiper/element/bundle';

registerSwiperElements();

@Component({
  selector: 'app-page-produit',
  standalone: true,
  imports: [CommonModule, RouterModule, CommentsDisplayerComponent, PageProduitSimilarProductComponent, MyShoppingCartComponent],
  templateUrl: './page-produit.component.html',
  styleUrls: ['./page-produit.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
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

  isMobile: boolean = this.deviceService.isMobile();

  @ViewChild('cartComponent') cartComponent!: MyShoppingCartComponent;
  @ViewChild('comments') comments!: CommentsDisplayerComponent;

  constructor(
    private apiHandler: ApiHandlerService,
    private route: ActivatedRoute,
    public loadingService: LoadingServiceService,
    public shoppingCartService: ShoppingCartService,
    public deviceService: DeviceDetectorService,
    private titleService: Title,
    private metaService: Meta
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
        this.setMetaData();
      }
    )
  }

  setMetaData() {
    this.titleService.setTitle("WeebZ - " + this.product.name);
    this.metaService.updateTag({name: "description", content: this.product.description});
    this.metaService.updateTag({name: "keywords", content: "manga, webtoon, lightnovel, lecture, gratuit, papier, boutique, goodies, achat, vente, partage, communauté, fan, "});
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

  onAddToCart() {
    this.shoppingCartService.addToCart(this.product, 1);
    this.cartComponent.openCart();
  }

  onBuy() {
    this.loadingService.setLoadingState(true);
    this.apiHandler.getSessionFromProduct(this.product.id).subscribe({
      next: (res: any) => {
        window.location.href = res.url;
      },
      error: err => {
      },
      complete: () => {
        this.loadingService.setLoadingState(false);
      }
    })
  }

  scrollToComments() {
    const element = document.querySelector('#comments');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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

  get productCategory() {
    if(this.product.category[0] === 'BOOK') return 'Livre';
    else return 'Goodie';
  }
}
