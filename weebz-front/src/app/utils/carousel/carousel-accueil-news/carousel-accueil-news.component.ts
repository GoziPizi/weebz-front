import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel-accueil-news',
  templateUrl: './carousel-accueil-news.component.html',
  styleUrls: ['./carousel-accueil-news.component.scss']
})
export class CarouselAccueilNewsComponent implements OnInit {

  carouselItems = [
    { image: '../../../assets/test-news.png', text: 'Texte 1', link: 'link1' },
    { image: '../../../assets/test-news.png', text: 'Texte 2', link: 'link2' },
    { image: '../../../assets/test-news.png', text: 'Texte 2', link: 'link2' },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
