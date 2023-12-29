import { Component, OnInit, Input, ElementRef, Renderer2 } from '@angular/core';
import { Artwork } from 'src/app/models/artwork';
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

  carouselItems:Artwork[] = [];

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
      artworks.forEach( (artwork: Artwork) => {
        this.carouselItems.push(artwork);
      });
    });
  }

}
