import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalogue-header',
  templateUrl: './catalogue-header.component.html',
  styleUrls: ['./catalogue-header.component.scss']
})
export class CatalogueHeaderComponent implements OnInit {

  @Input() categorie: string = 'manga';

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  updateCategorie(categorie: string) {
    this.router.navigate([], {
      queryParams: { type: categorie },
      queryParamsHandling: 'merge'
    });
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
