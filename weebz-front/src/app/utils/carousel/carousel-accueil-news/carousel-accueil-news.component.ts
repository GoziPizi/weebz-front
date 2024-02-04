import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CarouselNewsItemComponent } from './carousel-news-item/carousel-news-item.component';

@Component({
  selector: 'app-carousel-accueil-news',
  standalone: true,
  imports: [CommonModule, CarouselNewsItemComponent],
  templateUrl: './carousel-accueil-news.component.html',
  styleUrls: ['./carousel-accueil-news.component.scss']
})
export class CarouselAccueilNewsComponent implements OnInit {

  carouselItems = [
    { image: '../../../assets/fixtures/accueil/news/ephjos-game.png', text: 'Ephjos sort un jeu vidéo !', route: '/ephjos-game' },
    { image: '../../../assets/fixtures/accueil/news/burn-paper.png', text: 'Crise du papier', route: '/crise-du-papier' },
    { image: '../../../assets/fixtures/accueil/news/publie.png', text: 'Publie sur Weebz', route: '/tuto-upload' },
    { image: '../../../assets/fixtures/accueil/news/weebz.png', text: 'Weebz arrive', route: '/weebz-arrive' },
    { image: '../../../assets/fixtures/accueil/news/ink.png', text: 'Ink House x Weebz', route: '/ink-house' },
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onLeftArrowClick() {
    let old_left = this.carouselItems.shift();
      if(old_left != undefined) this.carouselItems.push(old_left);
  }

  onRightArrowClick() {
    let old_right = this.carouselItems.pop();
      if(old_right != undefined) this.carouselItems.unshift(old_right);
  }

}
