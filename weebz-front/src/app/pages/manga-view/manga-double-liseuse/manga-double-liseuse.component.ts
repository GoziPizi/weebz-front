import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manga-double-liseuse',
  templateUrl: './manga-double-liseuse.component.html',
  styleUrls: ['./manga-double-liseuse.component.scss']
})
export class MangaDoubleLiseuseComponent implements OnInit {

  @ViewChild('mangaContainer') mangaContainer!: ElementRef;

  id: string | null = null;
  url: string = "../../../assets/fixtures/";
  pages: string[] = []; // url of the pages
  currentPageIndex: number = 1;

  left_arrow: boolean = true;
  right_arrow: boolean = false;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.updatePages();
  }

  ngAfterViewInit() {
    this.mangaContainer.nativeElement.focus();
  }

  onBlur() {
    setTimeout(() => {  // Utiliser setTimeout pour éviter les conflits d'événements
      this.mangaContainer.nativeElement.focus();
    });
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

  get rightPage() {
    return this.pages[this.currentPageIndex - 1];
  }

  get leftPage() {
    return this.pages[this.currentPageIndex];
  }

  nextPage() {
    console.log("a");
    if (this.currentPageIndex < this.pages.length - 1) {
      this.currentPageIndex += 2;
      this.updateArrows();
    }
  }

  previousPage() {
    if (this.currentPageIndex > 1) {
      this.currentPageIndex -= 2;
      this.updateArrows();
    }
  }

  test() {
    console.log("test")
  }

}
