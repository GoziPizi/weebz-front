import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel-accueil-news',
  templateUrl: './carousel-accueil-news.component.html',
  styleUrls: ['./carousel-accueil-news.component.scss']
})
export class CarouselAccueilNewsComponent implements OnInit {

  carouselItems = [
    { image: '../../../assets/test-news.png', text: 'Texte 0', link: 'link1' },
    { image: '../../../assets/test-news.png', text: 'Texte 1', link: 'link2' },
    { image: '../../../assets/test-news.png', text: 'Texte 2', link: 'link2' },
    { image: '../../../assets/test-news.png', text: 'Texte 3', link: 'link1' },
    { image: '../../../assets/test-news.png', text: 'Texte 4', link: 'link2' },
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
