import { Component, Input, OnInit } from '@angular/core';
import { Chapter } from 'src/app/models/chapter';
import { ApiHandlerService } from 'src/app/services/api-handler.service';

@Component({
  selector: 'app-next-chapters-for-view',
  templateUrl: './next-chapters-for-view.component.html',
  styleUrls: ['./next-chapters-for-view.component.scss']
})
export class NextChaptersForViewComponent implements OnInit {

  @Input() artworkId: number = 0;
  @Input() chapterIndex: number = 1;
  @Input() type = "manga";

  chapters: Chapter[] = [];

  constructor(
    private apiHandlerService: ApiHandlerService
  ) { }

  ngOnInit(): void {
    this.fetchChapters();
  }

  fetchChapters() {
    return this.apiHandlerService.getAllChaptersByArtworkId(this.artworkId).subscribe({
      next: res => {
        console.log(res);
        this.chapters = res;
      }
    })
  }
}
