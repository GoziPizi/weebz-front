import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chapter-thumbnail',
  templateUrl: './chapter-thumbnail.component.html',
  styleUrls: ['./chapter-thumbnail.component.scss']
})
export class ChapterThumbnailComponent implements OnInit {

  /**
   * A component that displays a thumbnail of a chapter.
   * It is made of :
   * - The cover of the chapter
   * - The number of the chapter written under the cover
   * - On hover, a zoom.
   */

  @Input() artworkId: number;
  @Input() number: number;

  image="../../../../assets/test-accueil.png";
  link="";

  constructor() {
    this.artworkId = 0;
    this.number = 0;
  }

  ngOnInit(): void {
  }

  navigate(){
    window.location.href = this.link;
  }

}
