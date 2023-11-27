import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel-accueil-webtoon',
  templateUrl: './carousel-accueil-webtoon.component.html',
  styleUrls: ['./carousel-accueil-webtoon.component.scss']
})
export class CarouselAccueilWebtoonComponent implements OnInit {

  carouselItems = [
    { image: '../../../assets/test-accueil.png', text: 'Texte 1', link: 'link1' },
    { image: '../../../assets/test-accueil.png', text: 'Texte 2', link: 'link2' },
    { image: '../../../assets/test-accueil.png', text: 'Texte 2', link: 'link2' },
    { image: '../../../assets/test-accueil.png', text: 'Texte 2', link: 'link2' },
    { image: '../../../assets/test-accueil.png', text: 'Texte 2', link: 'link2' },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
