import { CommonModule } from "@angular/common";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

@Component({
  selector: 'app-mobile-carousel-accueil',
  standalone: true,
  templateUrl: './carousel-accueil.component.html',
  styleUrls: ['./carousel-accueil.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule]
})
export class CarouselAccueilComponent {
  carouselItems = [
    { image: '../../../assets/fixtures/accueil/news/pslp.png', text: 'Pain sur la Planche x Weebz', route: '/pslp' },
    { image: '../../../assets/fixtures/accueil/news/burn-paper.png', text: 'Crise du papier', route: '/crise-du-papier' },
    { image: '../../../assets/fixtures/accueil/news/publie.png', text: 'Publie sur Weebz', route: '/tuto-upload' },
    { image: '../../../assets/fixtures/accueil/news/weebz.png', text: 'Weebz arrive', route: '/weebz-arrive' },
    { image: '../../../assets/fixtures/accueil/news/ink.png', text: 'Ink House x Weebz', route: '/ink-house' },
  ];
}