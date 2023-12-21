import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-artwork-carousel-item',
  templateUrl: './artwork-carousel-item.component.html',
  styleUrls: ['./artwork-carousel-item.component.scss']
})
export class ArtworkCarouselItemComponent implements OnInit {

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
    this.synopsis = '';
    this.faved = false;
    this.views = 0;
  }

  ngOnInit(): void {

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
