import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-catalogue-header',
  templateUrl: './catalogue-header.component.html',
  styleUrls: ['./catalogue-header.component.scss']
})
export class CatalogueHeaderComponent implements OnInit {

  @Input() categorie: string = 'defaut';

  constructor() { }

  ngOnInit(): void {
  }

  updateCategorie(categorie: string) {
    this.categorie = categorie;
  }

  getDynamicStyles() {
    switch(this.categorie) {
      case 'defaut':
        return 'default-class';
      case 'manga':
        return 'manga-class';
      case 'webtoon':
        return 'webtoon-class';
      case 'lightnovel':
        return 'lightnovel-class';
      default: 
        return 'default-class';
    }
  }
}
