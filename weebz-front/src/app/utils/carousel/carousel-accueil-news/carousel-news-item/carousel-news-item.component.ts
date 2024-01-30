import { Component, OnInit, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-carousel-news-item',
  standalone: true,
  imports: [RouterModule],
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
}
