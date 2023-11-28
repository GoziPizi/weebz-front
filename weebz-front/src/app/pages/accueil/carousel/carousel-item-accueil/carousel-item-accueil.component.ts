import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carousel-item-accueil',
  templateUrl: './carousel-item-accueil.component.html',
  styleUrls: ['./carousel-item-accueil.component.scss']
})
export class CarouselItemAccueilComponent implements OnInit {
  
  @Input() image: string;
  @Input() text: string;
  @Input() text2: string;
  @Input() artworkId: string;
  
  constructor(
    private router: Router
  ) {
    this.image = '';
    this.text = 'Titre';
    this.text2 = 'Auteur';
    this.artworkId = '';
  }

  ngOnInit(): void {
  }

  navigate(){
    this.router.navigate(['/artwork/'+this.artworkId])
  }

}
