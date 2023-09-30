import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel-accueil-lightnovel',
  templateUrl: './carousel-accueil-lightnovel.component.html',
  styleUrls: ['./carousel-accueil-lightnovel.component.scss']
})
export class CarouselAccueilLightnovelComponent implements OnInit {

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
