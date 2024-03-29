import { CommonModule } from "@angular/common";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { RouterModule } from "@angular/router";
import { register as registerSwiperElements } from 'swiper/element/bundle';

registerSwiperElements();

@Component({
  selector: 'app-mobile-carousel-accueil',
  standalone: true,
  templateUrl: './carousel-accueil.component.html',
  styleUrls: ['./carousel-accueil.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, RouterModule]
})
export class CarouselAccueilComponent {
  carouselItems = [
    { image: '../../../assets/fixtures/accueil/news/ephjos-game.png', text: 'Pain sur la Planche x Weebz', route: '/ephjos-game' },
    { image: '../../../assets/fixtures/accueil/news/burn-paper.png', text: 'Crise du papier', route: '/crise-du-papier' },
    { image: '../../../assets/fixtures/accueil/news/publie.png', text: 'Publie sur Weebz', route: '/tuto-upload' },
    { image: '../../../assets/fixtures/accueil/news/weebz.png', text: 'Weebz arrive', route: '/weebz-arrive' },
    { image: '../../../assets/fixtures/accueil/news/Arrive_tres_prochainement_2.png', text: 'Nouveautés', route: '/nouveautes-6-fevrier' },
  ];

  constructor() { }

}