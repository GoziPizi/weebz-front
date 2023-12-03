import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { Shop } from 'src/app/models/shop';
import { ApiHandlerService } from 'src/app/services/api-handler.service';
import { LoadingServiceService } from 'src/app/services/loading-service.service';

@Component({
  selector: 'app-accueil-boutique',
  templateUrl: './accueil-boutique.component.html',
  styleUrls: ['./accueil-boutique.component.scss']
})
export class AccueilBoutiqueComponent implements OnInit {

  idShop: number = 1;
  shop: Shop = new Shop();

  constructor(
    private apiHandler: ApiHandlerService,
    private loadingService: LoadingServiceService
  ) { }

  ngOnInit(): void {
    this.fetchShopData();
  }

  fetchShopData() {

    this.loadingService.setLoadingState(true);

    // this.apiHandler.getShopData(this.idShop).subscribe(
    //   (res: Shop) => {
    //     console.log(res);
    //   }
    // )
    
    //Fake api data
    setTimeout(() => {
      this.shop = {
        id: 1,
        name: "Boutique de test",
        ownerId: 1,
        productsId: [1, 2, 3, 4, 5]
      },
      this.loadingService.setLoadingState(false);
    }, 500)
  }

}
