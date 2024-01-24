import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-vertical-liseuse',
  templateUrl: './vertical-liseuse.component.html',
  styleUrl: './vertical-liseuse.component.scss'
})
export class VerticalLiseuseComponent {

  @Input() pages : any[] = [];

  constructor() {
  }

}
