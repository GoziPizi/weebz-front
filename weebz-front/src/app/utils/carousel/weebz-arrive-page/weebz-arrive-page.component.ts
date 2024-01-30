import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-weebz-arrive-page',
  standalone: true,
  templateUrl: './weebz-arrive-page.component.html',
  styleUrl: './weebz-arrive-page.component.scss'
})
export class WeebzArrivePageComponent {

  constructor(
    private title: Title,
    private meta: Meta
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Weebz arrive - Weebz');
    this.meta.updateTag({ name: 'description', content: 'Weebz est la plateforme pour te rapprocher de tes auteurs et plonger entièrement dans leur univers. Tu vas pouvoir découvrir les oeuvres des tes artistes préférés, puis les soutenirs via leur boutique !' });
    this.meta.updateTag({ keywords: 'weebz, arrive, marché, manga, lightnovel, numérique, webtoon, japanimation, anime, scantrad, scan, trad, auteur, indépendant' });
  }

}
