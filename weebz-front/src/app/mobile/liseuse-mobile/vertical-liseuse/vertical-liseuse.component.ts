import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-vertical-liseuse',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vertical-liseuse.component.html',
  styleUrl: './vertical-liseuse.component.scss'
})
export class VerticalLiseuseComponent {

  @Input() pages : any[] = [];

  constructor() {
  }

}
