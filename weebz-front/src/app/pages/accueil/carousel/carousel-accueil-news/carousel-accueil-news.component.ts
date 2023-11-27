import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel-accueil-news',
  templateUrl: './carousel-accueil-news.component.html',
  styleUrls: ['./carousel-accueil-news.component.scss']
})
export class CarouselAccueilNewsComponent implements OnInit {

  carouselItems = [
    { image: '../../../assets/fixtures/accueil/news/1.png', text: 'Pain sur la Planche x Weebz', link: 'link1' },
    { image: '../../../assets/fixtures/accueil/news/2.png', text: 'Kagen x Weebz', link: 'link2' },
    { image: '../../../assets/fixtures/accueil/news/3.png', text: 'Ink House x Weebz', link: 'link2' },
    { image: '../../../assets/fixtures/accueil/news/4.png', text: 'Weebz arrive', link: 'link1' },
    { image: '../../../assets/fixtures/accueil/news/1.png', text: 'Pain sur la Planche x Weebz', link: 'link2' },
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
