import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-crise-papier-page',
  templateUrl: './crise-papier-page.component.html',
  styleUrl: './crise-papier-page.component.scss'
})
export class CrisePapierPageComponent {
  
    constructor(
      private title: Title,
      private meta: Meta
    ) { }
  
    ngOnInit(): void {
      this.title.setTitle('Crise du papier - Weebz');
      this.meta.updateTag({ name: 'description', content: 'La crise du papier est un phénomène qui touche les auteurs indépendants. Nous allons vous expliquer pourquoi et comment Weebz peut vous aider à vous en sortir !' });
      this.meta.updateTag({ keywords: 'weebz, crise, papier, manga, lightnovel, numérique, webtoon, japanimation, anime, scantrad, scan, trad, auteur, indépendant' });
    }
}
