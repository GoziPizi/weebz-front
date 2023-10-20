import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-manga-liseuse',
  templateUrl: './manga-liseuse.component.html',
  styleUrls: ['./manga-liseuse.component.scss']
})
export class MangaLiseuseComponent implements OnInit {

  @ViewChild('mangaContainer') mangaContainer!: ElementRef;
  @Input() pages: string[] = [];
  @Input() currentPage: BehaviorSubject<number> = new BehaviorSubject<number>(1);

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

  nextPage() {
    if (this.currentPageIndex < this.pages.length - 1) {
      this.currentPageIndex++;
      this.currentPage.next(this.currentPageIndex);
    }
  }

  previousPage() {
    if (this.currentPageIndex > 0) {
      this.currentPageIndex--;
      this.currentPage.next(this.currentPageIndex);
    }
  }

  get currentPageImg() {
    return this.pages[this.currentPageIndex-1];
  }

}
