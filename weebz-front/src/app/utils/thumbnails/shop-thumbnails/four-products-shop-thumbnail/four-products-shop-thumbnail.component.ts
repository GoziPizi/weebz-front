import { Component, Input, OnInit } from '@angular/core';
import { Shop } from 'src/app/models/shop';
import { ApiHandlerService } from 'src/app/services/api-handler.service';

@Component({
  selector: 'app-four-products-shop-thumbnail',
  templateUrl: './four-products-shop-thumbnail.component.html',
  styleUrls: ['./four-products-shop-thumbnail.component.scss']
})
export class FourProductsShopThumbnailComponent implements OnInit {

  @Input() shop: Shop = new Shop();

  constructor(
    private apiHandler: ApiHandlerService
  ) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.apiHandler.getShopData(this.shop.id).subscribe({
      next: (data: any) => {
        this.shop = data;
      }
    })
  }

  //template getters
  get backgroundUrl() {
    if(this.shop.backgroundUrl){
      return `url(${this.shop.backgroundUrl})`;
    }
    return "";
  }
}
