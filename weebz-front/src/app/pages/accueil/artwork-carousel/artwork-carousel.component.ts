import { Component, OnInit, Input, ElementRef, Renderer2 } from '@angular/core';
import { ApiHandlerService } from 'src/app/services/api-handler.service';

@Component({
  selector: 'app-artwork-carousel',
  templateUrl: './artwork-carousel.component.html',
  styleUrls: ['./artwork-carousel.component.scss']
})
export class CarouselArtworkComponent implements OnInit {

  @Input() title: string = '';
  @Input() category: string = '';
  @Input() color: string = '';

  carouselItems:any[] = [];
  constructor(
    private apiHandler: ApiHandlerService,
    private elRef: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.fetchCarouselItems();
    this.renderer.setStyle(
      this.elRef.nativeElement, 
      '--couleur-fond-after', 
      this.color
    );
  }

  fetchCarouselItems() {
    this.apiHandler.getArtworksByType(this.category).subscribe( (artworks: any) => {
      artworks.forEach( (artwork: any) => {
        this.carouselItems.push({
          image: artwork.coverUrl,
          text: artwork.title,
          artworkId: artwork.id,
          views: artwork.views,
          description: artwork.description
        });
      });
    });
  }

}
