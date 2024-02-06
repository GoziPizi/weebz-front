import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sortie-six',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sortie-six.component.html',
  styleUrl: './sortie-six.component.scss'
})
export class SortieSixComponent {

  constructor(
    private title: Title,
    private meta: Meta
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Sortie du 6 Février - Weebz');
    this.meta.updateTag({ name: 'description', content: 'Toutes les nouvelles sorties sur Weebz' });
    this.meta.updateTag({ keywords: 'weebz, sortie, six, collectif, mangaka, manga, lightnovel, numérique, webtoon, japanimation, anime, scantrad, scan, trad, auteur, indépendant' });
  }

}
