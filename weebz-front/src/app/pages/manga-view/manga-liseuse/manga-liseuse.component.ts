import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manga-liseuse',
  templateUrl: './manga-liseuse.component.html',
  styleUrls: ['./manga-liseuse.component.scss']
})
export class MangaLiseuseComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  pages: string[] = [
    "assets/test-accueil.png",
    "assets/test-accueil.png",
    "assets/test-accueil.png",
    "assets/test-accueil.png",
    "assets/test-accueil.png",
    "assets/test-accueil.png",
  ]
  currentPageIndex: number = 0;

  get currentPage() {
    return this.pages[this.currentPageIndex];
  }

  nextPage() {
    if (this.currentPageIndex < this.pages.length - 1) {
      this.currentPageIndex++;
    }
  }

  previousPage() {
    if (this.currentPageIndex > 0) {
      this.currentPageIndex--;
    }
  }

}
