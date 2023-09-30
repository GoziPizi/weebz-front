import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-carousel-item-accueil',
  templateUrl: './carousel-item-accueil.component.html',
  styleUrls: ['./carousel-item-accueil.component.scss']
})
export class CarouselItemAccueilComponent implements OnInit {
  
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
