import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DeviceDetectorService } from 'ngx-device-detector';
import { CarouselAccueilComponent } from 'src/app/mobile/carousel-accueil/carousel-accueil.component';
import { CarouselArtworkComponent } from './artwork-carousel/artwork-carousel.component';
import { CommonModule } from '@angular/common';
import { CarouselAccueilNewsComponent } from 'src/app/utils/carousel/carousel-accueil-news/carousel-accueil-news.component';
import { AccueilWeebzAuteursComponent } from './accueil-weebz-auteurs/accueil-weebz-auteurs.component';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [CommonModule, CarouselAccueilComponent, CarouselArtworkComponent, CarouselAccueilNewsComponent, AccueilWeebzAuteursComponent],
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {

  isMobile = this.deviceService.isMobile();
  
  constructor(
    private deviceService: DeviceDetectorService,
    private titleService: Title,
    private metaService: Meta
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("WeebZ - Accueil");

    this.metaService.updateTag({name: "description", content: "WeebZ est une plateforme de lecture et de partage de mangas en ligne. Vous pouvez y lire des mangas gratuitement, mais aussi acheter des mangas papier et des goodies."});
    this.metaService.updateTag({name: "keywords", content: "manga, webtoon, lightnovel, lecture, gratuit, papier, boutique, goodies, achat, vente, partage, communauté, fan"});
  }

}
