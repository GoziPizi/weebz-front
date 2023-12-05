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

    this.apiHandler.getShopData(this.idShop).subscribe(
      (res: Shop) => {
        this.shop = res;
        this.fetchAuthorData();
      }
    )
  }

  fetchAuthorData() {
    this.apiHandler.getAuthorData(this.shop.authorId).subscribe(
      (res: any) => {
        this.author = res;
      }
    )
  }

  //template getters

  get getAuthorName() {
    if (Object.keys(this.author).length !== 0) {
      return this.author.name;
    }
    return ""
  }

}
