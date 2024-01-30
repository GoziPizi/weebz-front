import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
@Component({
  selector: 'app-ink-collab-page',
  standalone: true,
  templateUrl: './ink-collab-page.component.html',
  styleUrl: './ink-collab-page.component.scss'
})
export class InkCollabPageComponent {

  constructor(
    private title: Title,
    private meta: Meta
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Ink House - Weebz');
    this.meta.updateTag({ name: 'description', content: 'Ink House est un collectif de mangaka indépendants qui se sont réunis pour vous proposer des oeuvres originales et de qualité !' });
    this.meta.updateTag({ keywords: 'weebz, ink house, ink, house, collectif, mangaka, manga, lightnovel, numérique, webtoon, japanimation, anime, scantrad, scan, trad, auteur, indépendant' });
  }

}
