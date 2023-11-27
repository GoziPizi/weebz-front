import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-carousel-news-item',
  templateUrl: './carousel-news-item.component.html',
  styleUrls: ['./carousel-news-item.component.scss']
})
export class CarouselNewsItemComponent implements OnInit {

  @Input() image: string;
  @Input() text: string;
  @Input() link: string;

  constructor() { 
    this.image = '';
    this.text = '';
    this.link = '';
  }

  ngOnInit(): void {
  }

  navigate(){
    window.location.href = this.link;
  }
}
