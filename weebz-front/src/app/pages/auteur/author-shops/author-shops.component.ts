import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Author } from 'src/app/models/author';
import { Shop } from 'src/app/models/shop';
import { DeviceDetectorService } from 'ngx-device-detector';

import { ApiHandlerService } from 'src/app/services/api-handler.service';
import { FourProductsShopThumbnailComponent } from 'src/app/utils/thumbnails/shop-thumbnails/four-products-shop-thumbnail/four-products-shop-thumbnail.component';
import { MobileShopThumbnailComponent } from 'src/app/mobile/thumbnails/mobile-shop-thumbnail/mobile-shop-thumbnail.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-author-shops',
  standalone: true,
  imports: [CommonModule, FourProductsShopThumbnailComponent, MobileShopThumbnailComponent],
  templateUrl: './author-shops.component.html',
  styleUrls: ['./author-shops.component.scss']
})
export class AuthorShopsComponent implements OnInit {

  @Input() author$: BehaviorSubject<any> = new BehaviorSubject<any>({});
  author: Author = new Author();

  shops: Shop[] = [];

  isMobile: boolean = this.deviceService.isMobile();

  constructor(
    private apiHandler: ApiHandlerService,
    private deviceService: DeviceDetectorService
  ) { }

  ngOnInit(): void {
    this.author$.subscribe((data:any) => {
      this.author = data;
      if(Object.keys(this.author).length !== 0) {
        this.fetchShops();
      }
    });
  }

  fetchShops() {
    this.apiHandler.getShopsFromAuthor(this.author.id).subscribe({
      next: (data: any) => {
        this.shops = data;
      }
    })
  }

  //template getters
  get authorName() {
    if(this.author.user){
      return this.author.user.surname;
    }
    return "";
  }

}
