import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent implements OnInit {

  constructor(
    private titleService: Title,
    private metaService: Meta
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("WeebZ - Catalogue");

    this.metaService.updateTag({name: "description", content: "Retrouve tous les mangas, webtoons et light novels disponibles sur WeebZ !"});
    this.metaService.updateTag({name: "keywords", content: "manga, webtoon, lightnovel, indépendant, lecture, gratuit, papier, boutique, goodies, achat, vente, partage, communauté, fan"});
  }

}
