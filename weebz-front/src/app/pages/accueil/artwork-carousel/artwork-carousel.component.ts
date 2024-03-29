import { Component, OnInit, Input, ElementRef, Renderer2 } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Router, RouterModule } from '@angular/router';

import { Artwork } from 'src/app/models/artwork';
import { ApiHandlerService } from 'src/app/services/api-handler.service';
import { ArtworkThumbnailComponent } from 'src/app/utils/thumbnails/artwork-thumbnail/artwork-thumbnail.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-artwork-carousel',
  standalone: true,
  imports: [CommonModule, RouterModule, ArtworkThumbnailComponent],
  templateUrl: './artwork-carousel.component.html',
  styleUrls: ['./artwork-carousel.component.scss']
})
export class CarouselArtworkComponent implements OnInit {

  @Input() title: string = '';
  @Input() category: string = '';
  @Input() color: string = '';

  carouselItems:Artwork[] = [];

  isMobile: boolean = this.deviceService.isMobile();

  constructor(
    private apiHandler: ApiHandlerService,
    private elRef: ElementRef,
    private renderer: Renderer2,
    private deviceService: DeviceDetectorService,
    private router: Router
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
        if(this.carouselItems.length < 5){
          this.carouselItems.push(artwork);
        }
      });
    });
  }

  get categoryTitle() {
    if(this.category === 'COMIC'){
      return 'webtoon';
    }
    if(this.category === 'NOVEL'){
      return 'lightnovel';
    }
    return 'manga';
  }
}
