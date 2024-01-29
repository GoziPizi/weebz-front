import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-ephjos-game',
  templateUrl: './ephjos-game.component.html',
  styleUrl: './ephjos-game.component.scss'
})
export class EphjosGameComponent {

  constructor(
    private title: Title,
    private meta: Meta
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Ephjos - Weebz');
    this.meta.updateTag({ name: 'description', content: 'Ephjos est un auteur indépendant qui propose des oeuvres originales et de qualité ! Récemment, Ephjos se lance de le développement de son propre jeu vidéo !' });
    this.meta.updateTag({ keywords: 'weebz, ephjos, ephjos game, ephjosgame, ephjos-game, ephjos game, ephjos, light novel, dark, fantasy, auteur, indépendant, jeu, vidéo, game, video, rpg, rpg make'});
  }
}
