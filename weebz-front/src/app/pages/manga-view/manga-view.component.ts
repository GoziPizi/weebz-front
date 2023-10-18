import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-manga-view',
  templateUrl: './manga-view.component.html',
  styleUrls: ['./manga-view.component.scss']
})
export class MangaViewComponent implements OnInit {

  title = "Manga View";
  id : string|null = null;
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
    this.id = this.route.snapshot.paramMap.get('id');
  }

  updateDoublePage() {
    this.doublePage = !this.doublePage;
    if(this.doublePage) this.cookieService.set('favoriteView', 'doublePage');
    else this.cookieService.set('favoriteView', 'singlePage');
  }

}
