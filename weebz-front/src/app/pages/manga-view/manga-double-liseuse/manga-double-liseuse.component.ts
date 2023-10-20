import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-manga-double-liseuse',
  templateUrl: './manga-double-liseuse.component.html',
  styleUrls: ['./manga-double-liseuse.component.scss']
})
export class MangaDoubleLiseuseComponent implements OnInit {

  @ViewChild('mangaContainer') mangaContainer!: ElementRef;
  @Input() pages: string[] = [];
  @Input() currentPage: BehaviorSubject<number> = new BehaviorSubject<number>(1);

  currentPageIndex: number = 1;

  left_arrow: boolean = true;
  right_arrow: boolean = false;

  ngOnInit(): void {
    this.currentPage.subscribe((page) => {
      this.currentPageIndex = page;
    });
  }

  ngAfterViewInit() {
    this.mangaContainer.nativeElement.focus();
  }

  onBlur() {
    setTimeout(() => {
      this.mangaContainer.nativeElement.focus();
    });
  }

  get rightPage() {
    return this.pages[this.currentPageIndex - 1];
  }

  get leftPage() {
    return this.pages[this.currentPageIndex];
  }

  //TODO : empecher le scroll des images qui bloque la page

  nextPage() {
    if (this.currentPageIndex < this.pages.length - 1) {
      this.currentPageIndex += 2;
      this.currentPage.next(this.currentPageIndex);
    }
  }

  previousPage() {
    if (this.currentPageIndex > 1) {
      this.currentPageIndex -= 2;
      this.currentPage.next(this.currentPageIndex);
    }
  }

}
