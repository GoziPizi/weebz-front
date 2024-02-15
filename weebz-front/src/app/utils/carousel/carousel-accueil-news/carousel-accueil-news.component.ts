import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CarouselNewsItemComponent } from './carousel-news-item/carousel-news-item.component';
import { register as registerSwiperElements } from 'swiper/element/bundle';
import { RouterLink } from '@angular/router';

registerSwiperElements();


@Component({
  selector: 'app-carousel-accueil-news',
  standalone: true,
  imports: [CommonModule, CarouselNewsItemComponent, RouterLink],
  templateUrl: './carousel-accueil-news.component.html',
  styleUrls: ['./carousel-accueil-news.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CarouselAccueilNewsComponent {

  carouselItems = [
    { image: '../../../assets/fixtures/accueil/news/ephjos-game.png', text: 'Ephjos sort un jeu vidéo !', route: '/ephjos-game' },
    { image: '../../../assets/fixtures/accueil/news/burn-paper.png', text: 'Crise du papier', route: '/crise-du-papier' },
    { image: '../../../assets/fixtures/accueil/news/publie.png', text: 'Publie sur Weebz', route: '/tuto-upload' },
    { image: '../../../assets/fixtures/accueil/news/weebz.png', text: 'Weebz arrive', route: '/weebz-arrive' },
    { image: '../../../assets/fixtures/accueil/news/ink.png', text: 'Ink House x Weebz', route: '/ink-house' },
  ];

}
