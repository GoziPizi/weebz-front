import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';
import { Subscription } from 'rxjs';
import { FullscreenService } from 'src/app/services/fullscreen.service';
import { ApiHandlerService } from 'src/app/services/api-handler.service';
import { Artwork } from 'src/app/models/artwork';
import { Router } from '@angular/router';
import { LoadingServiceService } from 'src/app/services/loading-service.service';

@Component({
  selector: 'app-manga-view',
  templateUrl: './manga-view.component.html',
  styleUrls: ['./manga-view.component.scss']
})
export class MangaViewComponent implements OnInit {

  private globalKeyListener: Function;

  @ViewChild('liseuseContainer') liseuseContainer!: ElementRef;

  artworkId : number|null = null;
  artwork : Artwork = new Artwork();

  chapterIndex : number|null = null;
  pageCount : number = 0; //TODO: get this from the backend

  //Contains the value of the current page. Starts at 1.
  currentPage: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  currentPageIndex: number = 1;

  pages : any[] = [];
  pagesUrl : string[] = [];

  doublePage: boolean = false;

  leftToRight: boolean = false;

  isFullScreen: boolean = false;

  isLiked: boolean = false; //TODO init
  isFollowed: boolean = false; //TODO init

  private unsubscribeFullscreen: () => void;
  private paramSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private cookieService: CookieService,
    private fullscreenService: FullscreenService,
    private apiHandlerService: ApiHandlerService,
    private renderer: Renderer2,
    private router: Router,
    private loadingService: LoadingServiceService
    ) { 
      let favoriteView = this.cookieService.get('favoriteView');
      if(favoriteView == 'doublePage') this.doublePage = true;
      else this.doublePage = false;
      this.unsubscribeFullscreen = this.fullscreenService.onFullscreenChange(() => {
        this.isFullScreen = !!document.fullscreenElement;
      });

      this.globalKeyListener = this.renderer.listen('window', 'keydown', (event) => {
        if (event.key === 'ArrowLeft') {
          this.onArrowLeft();
        } else if (event.key === 'ArrowRight') {
          this.onArrowRight();
        }
      });

      this.paramSubscription = this.route.params.subscribe(params => {
        this.resetComponent();
      });
    }

  ngOnInit(): void {
    this.artworkId = Number(this.route.snapshot.paramMap.get('artworkId'));
    this.chapterIndex = Number(this.route.snapshot.paramMap.get('chapter'));

    this.fetchPages();
    this.fetchData();

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

  resetComponent() {
    this.chapterIndex = Number(this.route.snapshot.paramMap.get('chapter'));
    if(this.artworkId) this.fetchPages();
    this.currentPage.next(1);
  }

  ngOnDestroy() {
    this.unsubscribeFullscreen();
    if (this.globalKeyListener) {
      this.globalKeyListener();
    }
    this.paramSubscription.unsubscribe();
  }

  ngAfterViewInit() {
    this.centerPage();
  }

  fetchPages() {
    this.loadingService.setLoadingState(true);
    return this.apiHandlerService.getPages(this.artworkId!, this.chapterIndex!).subscribe({
      next: (res: any) => {
        this.updatePages(res);
      },
      error: (err: any) => {
        this.loadingService.setLoadingState(false);
        this.router.navigate(['/artwork', this.artworkId!]);
      },
      complete: () => {
        this.loadingService.setLoadingState(false);
      }
    })
  }

  updatePages(res: any) {
    this.pages = res;
    this.pages.sort((a, b) => a.index - b.index);
    this.pageCount = this.pages.length;
    for(let i = 0; i < this.pages.length; i++) {
      this.pagesUrl.push(this.pages[i]["pageUrl"]);
    }
  }

  fetchData(){
    this.apiHandlerService.getArtwork(this.artworkId!).subscribe((res: any) => {
      this.artwork = res;
    });
  }

  preloadImage(n: number) {
    let img = new Image();
    img.src = this.pagesUrl[n];
  }

  updateDoublePage() {
    this.doublePage = !this.doublePage;
    if(this.doublePage) {
      if(this.currentPageIndex % 2 == 0) {
        this.currentPageIndex--;
        this.currentPage.next(this.currentPageIndex);
      }
    }
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

  min(a: number, b: number) {
    return Math.min(a, b);
  }

  switchReadingDirection() {
    this.leftToRight = !this.leftToRight;
  }

  //pages navigation

  onSingleNextPage() {
    if(this.currentPageIndex < this.pageCount) {
      this.currentPageIndex++;
      this.currentPage.next(this.currentPageIndex);
    }
  }

  onSinglePreviousPage() {
    if(this.currentPageIndex > 1) {
      this.currentPageIndex--;
      this.currentPage.next(this.currentPageIndex);
    }
  }

  onDoubleNextPage() {
    if(this.currentPageIndex < this.pageCount-2) {
      this.currentPageIndex += 2;
      this.currentPage.next(this.currentPageIndex);
    }
  }

  onDoublePreviousPage() {
    if(this.currentPageIndex > 1) {
      this.currentPageIndex -= 2;
      this.currentPage.next(this.currentPageIndex);
    }
  }

  onNextPage() {
    if(this.doublePage) this.onDoubleNextPage();
    else this.onSingleNextPage();
  }

  onPreviousPage() {
    if(this.doublePage) this.onDoublePreviousPage();
    else this.onSinglePreviousPage();
  }

  onArrowLeft() {
    if(this.leftToRight) this.onPreviousPage();
    else this.onNextPage();
  }

  onArrowRight() {
    if(this.leftToRight) this.onNextPage();
    else this.onPreviousPage();
  }

  //pages events
  onLike() {
    this.isLiked = !this.isLiked;
  }

  onFollow() {
    this.isFollowed = !this.isFollowed;
  }

  onScrollComments() {
    const comments = document.getElementById("comments");
    comments?.scrollIntoView({behavior: "smooth"});
  }

  onGoToNextChapter() {
    this.router.navigate(['/mangaview', this.artworkId, this.chapterIndex! + 1]);
  }
}
