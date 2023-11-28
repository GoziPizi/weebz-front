import { Component, OnInit } from '@angular/core';
import { ApiHandlerService } from 'src/app/services/api-handler.service';

@Component({
  selector: 'app-carousel-accueil-webtoon',
  templateUrl: './carousel-accueil-webtoon.component.html',
  styleUrls: ['./carousel-accueil-webtoon.component.scss']
})
export class CarouselAccueilWebtoonComponent implements OnInit {

  carouselItems:any[] = [];

  constructor(
    private apiHandler: ApiHandlerService
  ) { }

  ngOnInit(): void {
    this.fetchCarouselItems();
  }

  fetchCarouselItems() {
    this.apiHandler.getArtworksByType('COMIC').subscribe( (artworks: any) => {
      artworks.forEach( (artwork: any) => {
        this.carouselItems.push({
          image: artwork.coverUrl,
          text: artwork.title,
          artworkId: artwork.id,
          views: artwork.views,
        });
      });
    });
  }

}
