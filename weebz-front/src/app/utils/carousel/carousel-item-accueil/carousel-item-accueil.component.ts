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
  @Input() synopsis: string;
  @Input() artworkId: string;
  @Input() faved: boolean;
  @Input() views: number;

  constructor(
    private router: Router
  ) {
    this.image = '';
    this.text = 'Titre';
    this.text2 = 'Auteur';
    this.artworkId = '';
    this.synopsis = 'lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies ultricies, nunc nisl luctus nisl, quis lacinia nisl nisl eget nisl. Nullam auctor, nisl eget ultricies ultricies, nunc nisl luctus nisl, quis lacinia nisl nisl eget nisl.';
    this.faved = false;
    this.views = 0;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    //Tronque le synopsis si trop long
  }

  navigate(){
    this.router.navigate(['/artwork/'+this.artworkId])
  }

  onFav(event: any){
    //TODO : Ajouter l'oeuvre aux favoris appel API
    this.faved = !this.faved;
    event.stopPropagation();
  }

}
