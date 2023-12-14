import { Component, Input, OnInit } from '@angular/core';
import { Chapter } from 'src/app/models/chapter';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chapter-thumbnail',
  templateUrl: './chapter-thumbnail.component.html',
  styleUrls: ['./chapter-thumbnail.component.scss']
})
export class ChapterThumbnailComponent implements OnInit {

  @Input() chapter: Chapter = new Chapter();
  @Input() type = "manga";

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  navigate() {
    switch (this.type) {
      case "manga":
        this.router.navigate(["/mangaview", this.chapter.artworkId, this.chapter.id]);
        break;
      case "webtoon":
        this.router.navigate(["/webtoonview", this.chapter.artworkId, this.chapter.id]);
        break;
      case "lightnovel":
        this.router.navigate(["/lightnovel", this.chapter.artworkId, this.chapter.id]);
        break;
    }
  }

}
