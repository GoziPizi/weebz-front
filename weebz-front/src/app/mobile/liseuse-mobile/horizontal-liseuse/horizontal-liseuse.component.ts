import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-horizontal-liseuse',
  templateUrl: './horizontal-liseuse.component.html',
  styleUrl: './horizontal-liseuse.component.scss'
})
export class HorizontalLiseuseComponent {

  @Input() pages: any[] = [];
  currentPage: number = 0;

  constructor() { }

}
