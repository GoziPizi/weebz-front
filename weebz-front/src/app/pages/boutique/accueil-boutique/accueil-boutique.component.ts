import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { Shop } from 'src/app/models/shop';
import { ApiHandlerService } from 'src/app/services/api-handler.service';
import { LoadingServiceService } from 'src/app/services/loading-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-accueil-boutique',
  templateUrl: './accueil-boutique.component.html',
  styleUrls: ['./accueil-boutique.component.scss']
})
export class AccueilBoutiqueComponent implements OnInit {

  idShop: number = 1;
  shop: Shop = new Shop();
  author: any = {};

  filters: string = "";

  constructor(
    private apiHandler: ApiHandlerService,
    private loadingService: LoadingServiceService,
    private route: ActivatedRoute
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
        console.log(res)
        this.shop = res;
        this.fetchAuthorData();
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

}
