import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-manga-view',
  templateUrl: './manga-view.component.html',
  styleUrls: ['./manga-view.component.scss']
})
export class MangaViewComponent implements OnInit {

  title = "Manga View";
  artworkId : string|null = null;
  chapter : string|null = null;
  pageCount : number = 21; //TODO: get this from the backend
  currentPage: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  pages : string[] = [];
  doublePage: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private cookieService: CookieService
    ) { 
      let favoriteView = this.cookieService.get('favoriteView');
      if(favoriteView == 'doublePage') this.doublePage = true;
      else this.doublePage = false;
    }

  ngOnInit(): void {
    this.artworkId = this.route.snapshot.paramMap.get('artworkId');
    this.chapter = this.route.snapshot.paramMap.get('chapter');
    let url = "https://weebz-dev-2.s3.eu-west-3.amazonaws.com/artworks/" + this.artworkId + "/" + this.chapter;
    for(let i = 1; i <= this.pageCount; i++) {
      this.pages.push(url + "/" + i + ".jpeg");
    }
    this.currentPage.subscribe((page) => {
      this.preloadImage(page+1);
      this.preloadImage(page+2);
    });
  }

  preloadImage(n: number) {
    let img = new Image();
    img.src = this.pages[n];
  }

  updateDoublePage() {
    this.doublePage = !this.doublePage;
    if(this.doublePage) this.cookieService.set('favoriteView', 'doublePage');
    else this.cookieService.set('favoriteView', 'singlePage');
  }

}
