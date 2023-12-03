import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, max } from 'rxjs';

@Component({
  selector: 'app-manga-liseuse',
  templateUrl: './manga-liseuse.component.html',
  styleUrls: ['./manga-liseuse.component.scss']
})
export class MangaLiseuseComponent implements OnInit {

  @ViewChild('mangaContainer') mangaContainer!: ElementRef;
  @Input() pages: string[] = [];
  @Input() currentPage: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  @Input() leftToRight: boolean = false;

  currentPageIndex: number = 1;

  left_arrow: boolean = true;
  right_arrow: boolean = false;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.currentPage.subscribe((page) => {
      this.currentPageIndex = page;
    });
  }

  ngAfterViewInit() {
    this.mangaContainer.nativeElement.focus();
  }

  onBlur() {
    setTimeout(() => {  // Utiliser setTimeout pour éviter les conflits d'événements
      this.mangaContainer.nativeElement.focus();
    });
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
    this.currentPageIndex++;
    if(this.currentPageIndex > this.pages.length) {
      this.currentPageIndex = this.pages.length;
    }
    this.currentPage.next(this.currentPageIndex);
  }

  previousPage() {
    this.currentPageIndex--;
    if(this.currentPageIndex < 1) {
      this.currentPageIndex = 1;
    }
    this.currentPage.next(this.currentPageIndex);
  }

  get currentPageImg() {
    return this.pages[this.currentPageIndex-1];
  }

}
