import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carousel-news-item',
  templateUrl: './carousel-news-item.component.html',
  styleUrls: ['./carousel-news-item.component.scss']
})
export class CarouselNewsItemComponent implements OnInit {

  @Input() image: string;
  @Input() text: string;
  @Input() route: string;

  constructor(
    private router: Router
  ) { 
    this.image = '';
    this.text = '';
    this.route = '';
  }

  ngOnInit(): void {
  }

  navigate(){
    this.router.navigate([this.route]);
  }
}
