import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Product } from 'src/app/models/product';
import { Shop } from 'src/app/models/shop';
import { ApiHandlerService } from 'src/app/services/api-handler.service';
import { LoadingServiceService } from 'src/app/services/loading-service.service';
import { ActivatedRoute } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ProductVignetteComponent } from '../product-vignette/product-vignette.component';
import { CommonModule } from '@angular/common';
import { MobileProductVignetteComponent } from 'src/app/mobile/thumbnails/mobile-product-vignette/mobile-product-vignette.component';
import { MyShoppingCartComponent } from 'src/app/utils/shop/my-shopping-cart/my-shopping-cart.component';


@Component({
  selector: 'app-accueil-boutique',
  standalone: true,
  imports: [CommonModule,ProductVignetteComponent, MobileProductVignetteComponent, MyShoppingCartComponent],
  templateUrl: './accueil-boutique.component.html',
  styleUrls: ['./accueil-boutique.component.scss']
})
export class AccueilBoutiqueComponent implements OnInit {

  idShop: number = 1;
  shop: Shop = new Shop();
  author: any = {};

  filters: string = "";

  isMobile: boolean = this.deviceService.isMobile();

  constructor(
    private apiHandler: ApiHandlerService,
    private loadingService: LoadingServiceService,
    private route: ActivatedRoute,
    public deviceService: DeviceDetectorService,
    private titleService: Title,
    private metaService: Meta
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.idShop = Number(params.get('shopId'));
    })
    this.fetchShopData();
  }

  fetchShopData() {
    this.loadingService.setLoadingState(true);
    this.apiHandler.getShopData(this.idShop).subscribe({
      next: (res: Shop) => {
        this.shop = res;
        this.fetchAuthorData();
        this.setMetaData();
      },
      complete: () => {
        this.loadingService.setLoadingState(false);
      }
    })
  }

  fetchAuthorData() {
    this.apiHandler.getAuthorData(this.shop.authorId).subscribe({
      next: (res: any) => {
        this.author = res;
      },
      complete: () => {
        this.loadingService.setLoadingState(false);
      }
    })
  }

  setMetaData() {
    this.titleService.setTitle("WeebZ - " + this.shop.name);
    this.metaService.updateTag({name: "description", content: this.shop.description});
    this.metaService.updateTag({name: "keywords", content: "manga, webtoon, lightnovel, lecture, gratuit, papier, boutique, goodies, achat, vente, partage, communauté, fan, "});
  }

  //template getters

  filtersValue(value: string) {
    this.filters = value;
  }

  get productsToDisplay() {
    if (this.filters === "") {
      return this.shop.products;
    }
    return this.shop.products.filter((product: Product) => {
      return product.category.includes(this.filters);
    })
  }

  get getAuthorName() {
    if (Object.keys(this.author).length !== 0) {
      return this.author.user.surname;
    }
    return ""
  }

  get shopName() {
    return this.shop.name;
  }

  get authorImage() {
    if (Object.keys(this.author).length !== 0) {
      return this.author.user.pictureUrl;
    }
    return ""
  }

  get authorName() {
    if (Object.keys(this.author).length !== 0) {
      return this.author.user.name;
    }
    return ""
  }

}
