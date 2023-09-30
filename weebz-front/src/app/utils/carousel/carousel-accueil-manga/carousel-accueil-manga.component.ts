import { Component, OnInit } from '@angular/core';
import { CarouselItemAccueilComponent } from '../carousel-item-accueil/carousel-item-accueil.component';

@Component({
  selector: 'app-carousel-accueil-manga',
  templateUrl: './carousel-accueil-manga.component.html',
  styleUrls: ['./carousel-accueil-manga.component.scss']
})
export class CarouselAccueilMangaComponent implements OnInit {

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
