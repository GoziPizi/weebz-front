import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manga-liseuse',
  templateUrl: './manga-liseuse.component.html',
  styleUrls: ['./manga-liseuse.component.scss']
})
export class MangaLiseuseComponent implements OnInit {

  id: string | null = null;
  url: string = "../../../assets/fixtures/";
  pages: string[] = [];
  currentPageIndex: number = 1;

  left_arrow: boolean = true;
  right_arrow: boolean = false;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.updatePages();
    console.log(this.id)
    console.log(this.pages)
  }

  get_number_of_pages() : number {
    return 10;
  }

  updatePages() {
    let nb_pages = this.get_number_of_pages();
    for (let i=1; i<=nb_pages; i++) {
      if(this.id){
        this.pages.push(this.url + this.id + "/" + i + ".png");
      }
    }
  }

  updateArrows() {

  }

  get currentPage() {
    return this.pages[this.currentPageIndex];
  }

  nextPage() {
    if (this.currentPageIndex < this.pages.length - 1) {
      this.currentPageIndex++;
      this.updateArrows();
    }
  }

  previousPage() {
    if (this.currentPageIndex > 0) {
      this.currentPageIndex--;
      this.updateArrows();
    }
  }

}
