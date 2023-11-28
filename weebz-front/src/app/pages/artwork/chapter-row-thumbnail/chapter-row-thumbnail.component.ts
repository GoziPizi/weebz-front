import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chapter-row-thumbnail',
  templateUrl: './chapter-row-thumbnail.component.html',
  styleUrls: ['./chapter-row-thumbnail.component.scss']
})
export class ChapterRowThumbnailComponent implements OnInit {

  /**
   * A component that displays a row of chapter thumbnail.
   * Remplis la largeur de la page avec le nombre de chapires donné.
   */

  @Input() numberOfChapters: number = 0;
  @Input() startingChapter: number = 0;
  @Input() unrendered: number = 0;

  row_size: number = 0;
  tableauIndex: number[] = [];

  constructor() { }

  ngOnInit() {
    this.row_size = Math.floor(12 / this.numberOfChapters);
    for (let i = 0; i < this.numberOfChapters; i++) {
      if(i < this.numberOfChapters - this.unrendered) {
        this.tableauIndex.push(i);
      }
    }
  }
}
