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
  @Input() leftToRight: boolean = false;

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

  get rightPage() {
    if(this.leftToRight){
      if(this.currentPageIndex <= this.pages.length) {
        return this.pages[this.currentPageIndex]
      } else {
        return "" //Nothing to return
      }
    }
    return this.pages[this.currentPageIndex-1];
  }

  get rightPageIndex() {
    if(this.leftToRight){
      if(this.currentPageIndex + 1 <= this.pages.length) {
        return this.currentPageIndex + 1
      } else {
        return 0 //Nothing to return
      }
    }
    return this.currentPageIndex;
  }

  get leftPage() {
    if(this.leftToRight){
      return this.pages[this.currentPageIndex-1]
    }
    if(this.currentPageIndex <= this.pages.length){
      return this.pages[this.currentPageIndex]
    }
    return "" //Nothing to return
  }
  
  get leftPageIndex() {
    if(this.leftToRight){
      return this.currentPageIndex
    }
    if(this.currentPageIndex + 1 <= this.pages.length){
      return this.currentPageIndex + 1
    }
    return 0 //Nothing to return
  }

  leftArrowInput() {
    if(this.leftToRight) this.previousPage();
    else this.nextPage();
  }

  rightArrowInput() {
    if(this.leftToRight) this.nextPage();
    else this.previousPage();
  }

  nextPage() {
    if (this.currentPageIndex < this.pages.length - 1) {
      this.currentPageIndex += 2;
    }
    this.currentPage.next(this.currentPageIndex);
  }

  previousPage() {
    this.currentPageIndex -= 2;
    if(this.currentPageIndex < 1) {
      this.currentPageIndex = 1;
    }
    this.currentPage.next(this.currentPageIndex);
  }

}
