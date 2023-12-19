import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Chapter } from 'src/app/models/chapter';
import { ApiHandlerService } from 'src/app/services/api-handler.service';

@Component({
  selector: 'app-next-chapters-for-view',
  templateUrl: './next-chapters-for-view.component.html',
  styleUrls: ['./next-chapters-for-view.component.scss']
})
export class NextChaptersForViewComponent implements OnInit {

  @Input() authorId: number = 0;
  @Input() reloadObservable: Observable<void> = new Observable<void>();
  @Input() artworkId: number = 0;
  @Input() chapterIndex: number = 1;
  @Input() type = "manga";

  chapters: Chapter[] = [];

  constructor(
    private apiHandlerService: ApiHandlerService,
  ) { }

  ngOnInit(): void {
    this.fetchChapters();
    this.reloadObservable.subscribe({
      next: () => {
        this.fetchChapters();
      }
    })
  }

  fetchChapters() {
    return this.apiHandlerService.getAllChaptersByArtworkId(this.artworkId).subscribe({
      next: res => {
        this.chapters = res;
        this.trimChapters();
      }
    })
  }

  trimChapters() {
    this.chapters = this.chapters.filter(chapter => chapter.index > this.chapterIndex);
  }

  sortChapters() {
    this.chapters.sort((a, b) => a.index - b.index);
  }
}
