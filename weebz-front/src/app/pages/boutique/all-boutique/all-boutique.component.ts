import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Shop } from 'src/app/models/shop';
import { ApiHandlerService } from 'src/app/services/api-handler.service';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-all-boutique',
  templateUrl: './all-boutique.component.html',
  styleUrls: ['./all-boutique.component.scss']
})
export class AllBoutiqueComponent implements OnInit {

  shops: Shop[] = [];

  isMobile: boolean = this.deviceService.isMobile();

  constructor(
    private apiHandler: ApiHandlerService,
    public deviceService: DeviceDetectorService,
    private titleService: Title,
    private metaService: Meta
  ) { }

  ngOnInit(): void {
    this.fetchShops();
  }

  fetchShops() {
    this.apiHandler.getAllShops().subscribe(
      (shops: Shop[]) => {
        this.shops = shops;
        this.titleService.setTitle("WeebZ - Boutique");
        this.metaService.updateTag({name: "description", content: "Retrouve toutes les boutiques de WeebZ !"});
        this.metaService.updateTag({name: "keywords", content: "manga, webtoon, lightnovel, lecture, gratuit, papier, boutique, goodies, achat, vente, partage, communauté, fan, "});
      }
    )
  }

}
