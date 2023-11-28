import { Component, OnInit } from '@angular/core';
import { ApiHandlerService } from 'src/app/services/api-handler.service';

@Component({
  selector: 'app-carousel-accueil-manga',
  templateUrl: './carousel-accueil-manga.component.html',
  styleUrls: ['./carousel-accueil-manga.component.scss']
})
export class CarouselAccueilMangaComponent implements OnInit {

  carouselItems:any[] = [];
  constructor(
    private apiHandler: ApiHandlerService
  ) { }

  ngOnInit(): void {
    this.fetchCarouselItems();
  }

  fetchCarouselItems() {
    this.apiHandler.getArtworksByType('MANGA').subscribe( (artworks: any) => {
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
