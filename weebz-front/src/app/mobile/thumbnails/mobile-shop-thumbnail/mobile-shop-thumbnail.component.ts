import { Component, Input } from '@angular/core';
import { Shop } from 'src/app/models/shop';
import { ApiHandlerService } from 'src/app/services/api-handler.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MobileProductVignetteComponent } from '../mobile-product-vignette/mobile-product-vignette.component';

@Component({
  selector: 'app-mobile-shop-thumbnail',
  standalone: true,
  imports: [CommonModule, RouterModule, MobileProductVignetteComponent],
  templateUrl: './mobile-shop-thumbnail.component.html',
  styleUrl: './mobile-shop-thumbnail.component.scss'
})
export class MobileShopThumbnailComponent {

  @Input() shopId: number = 0;
  shop: Shop = new Shop();

  constructor(
    private apiHandler: ApiHandlerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    if(this.shopId == 0) return;
    this.apiHandler.getShopData(this.shopId).subscribe({
      next: (data: any) => {
        this.shop = data;
      }
    });
  }

  get shopName() {
    return this.shop.name ? this.shop.name : 'Nom du shop';
  }

  get backgroundUrl() {
    return this.shop.backgroundUrl ? this.shop.backgroundUrl : '';
  }

}
