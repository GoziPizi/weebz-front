import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pslp-page',
  templateUrl: './pslp-page.component.html',
  styleUrl: './pslp-page.component.scss'
})
export class PslpPageComponent {

  constructor(
    private title: Title,
    private meta: Meta
  ) { }

  ngOnInit(): void {
    this.title.setTitle('PSLP - Weebz');
    this.meta.updateTag({ name: 'description', content: 'Pain Sur La Planche x Weebz !!' });
    this.meta.updateTag({ keywords: 'weebz, pslp, collectif, mangaka, manga, lightnovel, numérique, webtoon, japanimation, anime, scantrad, scan, trad, auteur, indépendant' });
  }
}
