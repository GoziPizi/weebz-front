import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/models/product';
import { Shop } from 'src/app/models/shop';
import { ApiHandlerService } from 'src/app/services/api-handler.service';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-page-produit-similar-product',
  templateUrl: './page-produit-similar-product.component.html',
  styleUrls: ['./page-produit-similar-product.component.scss']
})
export class PageProduitSimilarProductComponent implements OnInit {

  @Input() product$: BehaviorSubject<Product> = new BehaviorSubject<Product>(new Product());
  shop: Shop = new Shop();
  isMobile: boolean = this.deviceService.isMobile();

  constructor(
    private apiHandler: ApiHandlerService,
    public deviceService: DeviceDetectorService
  ) { }

  ngOnInit(): void {
    this.product$.subscribe({
      next: (product) => {
        if(product.shopId != 0){
          this.fetchShopData(product.shopId);
        }
      }
    })
  }

  fetchShopData(shopId: number) {
    this.apiHandler.getShopData(shopId).subscribe(
      (res: Shop) => {
        this.shop = res;
      }
    )
  }

}
