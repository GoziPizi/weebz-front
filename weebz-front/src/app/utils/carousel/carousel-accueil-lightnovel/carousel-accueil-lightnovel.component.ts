import { Component, OnInit } from '@angular/core';
import { ApiHandlerService } from 'src/app/services/api-handler.service';

@Component({
  selector: 'app-carousel-accueil-lightnovel',
  templateUrl: './carousel-accueil-lightnovel.component.html',
  styleUrls: ['./carousel-accueil-lightnovel.component.scss']
})
export class CarouselAccueilLightnovelComponent implements OnInit {

  carouselItems:any[] = [];

  constructor(
    private apiHandler: ApiHandlerService
  ) { }

  ngOnInit(): void {
    this.fetchCarouselItems();
  }

  fetchCarouselItems() {
    this.apiHandler.getArtworksByType('NOVEL').subscribe( (artworks: any) => {
      artworks.forEach( (artwork: any) => {
        this.carouselItems.push({
          image: artwork.coverUrl,
          text: artwork.title,
          artworkId: artwork.id
        });
      });
    });
  }

}
