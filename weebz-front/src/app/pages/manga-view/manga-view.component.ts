import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';
import { FullscreenService } from 'src/app/services/fullscreen.service';
import { ApiHandlerService } from 'src/app/services/api-handler.service';

@Component({
  selector: 'app-manga-view',
  templateUrl: './manga-view.component.html',
  styleUrls: ['./manga-view.component.scss']
})
export class MangaViewComponent implements OnInit {

  @ViewChild('liseuseContainer') liseuseContainer!: ElementRef;

  title = "Manga View";
  artworkId : number|null = null;
  chapter : number|null = null;
  pageCount : number = 21; //TODO: get this from the backend
  currentPage: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  currentPageIndex: number = 1;
  pages : any[] = [];
  pagesUrl : string[] = [];
  doublePage: boolean = false;
  isFullScreen: boolean = false;
  private unsubscribeFullscreen: () => void;

  constructor(
    private route: ActivatedRoute,
    private cookieService: CookieService,
    private fullscreenService: FullscreenService,
    private apiHandlerService: ApiHandlerService
    ) { 
      let favoriteView = this.cookieService.get('favoriteView');
      if(favoriteView == 'doublePage') this.doublePage = true;
      else this.doublePage = false;
      this.unsubscribeFullscreen = this.fullscreenService.onFullscreenChange(() => {
        this.isFullScreen = !!document.fullscreenElement;
      });
    }

  ngOnInit(): void {
    this.artworkId = Number(this.route.snapshot.paramMap.get('artworkId'));
    this.chapter = Number(this.route.snapshot.paramMap.get('chapter'));
    console.log("artworkId: " + this.artworkId);
    console.log("chapter: " + this.chapter);

    this.fetchUrl();

    this.currentPage.subscribe((page) => {
      if(page+1 < this.pages.length){
        this.preloadImage(page+1);
      }
      if(page+2 < this.pages.length){
        this.preloadImage(page+2);
      }
      this.currentPageIndex = page;
    });
  }

  ngAfterViewInit() {
    this.centerPage();
  }

  fetchUrl() {
    this.apiHandlerService.getPages(this.artworkId!, this.chapter!).subscribe((res: any) => {
      console.log(res);
      this.pages = res;
      this.pageCount = this.pages.length;
      for(let i = 0; i < this.pages.length; i++) {
        this.pagesUrl.push(this.pages[i]["pageUrl"]);
      }
      console.log(this.pagesUrl);
    })
  }

  preloadImage(n: number) {
    let img = new Image();
    img.src = this.pagesUrl[n];
  }

  updateDoublePage() {
    this.doublePage = !this.doublePage;
    if(this.doublePage) this.cookieService.set('favoriteView', 'doublePage');
    else this.cookieService.set('favoriteView', 'singlePage');
  }

  centerPage() {
    const componentPosition = this.liseuseContainer.nativeElement.offsetTop;
    const screenHeight = window.innerHeight;

    // Calculer la position de défilement pour centrer le composant
    const scrollToPosition = componentPosition - (screenHeight / 2) + (this.liseuseContainer.nativeElement.offsetHeight / 2);

    window.scrollTo({
        top: scrollToPosition,
        behavior: 'smooth'  // Pour un défilement en douceur
    });
  }

  toggleFullScreen() {
    this.isFullScreen = !this.isFullScreen;
    if(this.isFullScreen) {
      this.fullscreenService.enterFullscreen(this.liseuseContainer.nativeElement);
    } else {
      this.fullscreenService.exitFullscreen();
      this.centerPage();
    }
  }

  ngOnDestroy() {
    this.unsubscribeFullscreen();
  }

  min(a: number, b: number) {
    return Math.min(a, b);
  }
}
