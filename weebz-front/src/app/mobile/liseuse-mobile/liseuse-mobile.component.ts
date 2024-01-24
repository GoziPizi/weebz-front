import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';

import { Artwork } from 'src/app/models/artwork';
import { Author } from 'src/app/models/author';
import { Chapter } from 'src/app/models/chapter';
import { Shop } from 'src/app/models/shop';

import { ApiHandlerService } from 'src/app/services/api-handler.service';
import { CommentsDisplayerComponent } from 'src/app/utils/comments/comments-displayer/comments-displayer.component';
import { NextChaptersForViewComponent } from 'src/app/utils/navigation/next-chapters-for-view/next-chapters-for-view.component';
import { FourProductsShopThumbnailComponent } from 'src/app/utils/thumbnails/shop-thumbnails/four-products-shop-thumbnail/four-products-shop-thumbnail.component';

@Component({
  selector: 'app-liseuse-mobile',
  templateUrl: './liseuse-mobile.component.html',
  styleUrl: './liseuse-mobile.component.scss'
})
export class LiseuseMobileComponent {

  @ViewChild('liseuseContainer') liseuseContainer!: ElementRef;
  @ViewChild('shopComponent') shopComponent: FourProductsShopThumbnailComponent | undefined;
  @ViewChild('nextChapters') nextChaptersComponent!: NextChaptersForViewComponent;
  nextChaptersShown: boolean = false;
  @ViewChild('comments') comments!: CommentsDisplayerComponent;
  commentsShown: boolean = false;

  @ViewChild('bottomPage') bottomPage!: ElementRef;

  artworkId : number = 0;
  chapterId : number = 0;

  artwork : Artwork = new Artwork();
  chapter : Chapter = new Chapter();
  author : Author = new Author();
  shop : Shop | null = null;
  nextChapters : Chapter[] = [];

  pages : any[] = [];
  currentPage$: BehaviorSubject<number> = new BehaviorSubject<number>(1);

  verticalScroll: boolean = true; //horizontal scroll by default
  fullScreen: boolean = false;

  isFingerOnScreen: boolean = false;
  canScroll: boolean = false;

  bottomIntersectRatio: number = 0;
  threshold: number = 0.1; //opacity before loading next page
  isThresholdReached: boolean = false;
  timerThreshold: any;
  hasToNavigate: boolean = false;

  private paramSubscription: Subscription;
  private preloadSubscription: Subscription;

  constructor(
    private api: ApiHandlerService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.artworkId = this.route.snapshot.params['artworkId'];
    this.chapterId = this.route.snapshot.params['chapterId'];

    this.paramSubscription = this.route.params.subscribe(params => {
      this.artworkId = params['artworkId'];
      this.chapterId = params['chapterId'];
      this.reInit();
      this.nextChaptersComponent?.fetchChapters();
      this.scrollToTop();
    });

    this.preloadSubscription = this.currentPage$.subscribe((pageIndex) => {
      if(pageIndex+1 < this.pages.length){
        this.preloadImage(pageIndex+1);
      }
      if(pageIndex+2 < this.pages.length){
        this.preloadImage(pageIndex+2);
      }
    });
  }

  preloadImage(n: number) {
    let img = new Image();
    img.src = this.pages[n].pageUrl;
  }

  ngOnInit(): void {
    this.fetchArtwork();
    this.fetchChapter();
    this.fetchPages();
    this.fetchShopData();
    this.scrollToTop();
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }

  reInit(): void {
    this.fetchChapter();
    this.fetchPages();
    this.currentPage$.next(1);
  }

  ngAfterViewInit() {
    const options = {
      threshold: Array.from({ length: 100 }, (_, i) => i / 100) // Crée un tableau de seuils de 0 à 1
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        this.bottomIntersectRatio = entry.intersectionRatio;
        this.setThresholdReached( this.bottomIntersectRatio >= this.threshold );
        if(this.bottomIntersectRatio > 0 && !this.isFingerOnScreen){
          this.scrollToHideBottom();
        }
      });
    }, options);

    observer.observe(this.bottomPage.nativeElement);

    //set scroll to true after 1sec 
    setTimeout(() => {
      this.canScroll = true;
    }, 1000);
  }

  vibrate() {
    if (navigator.vibrate) {
      navigator.vibrate(10);
    }
  }

  setThresholdReached(value: boolean) {
    // Si la valeur est vraie et que le seuil n'est pas encore atteint
    if(value && !this.isThresholdReached){
      // Réinitialiser le timer précédent, si présent
      clearTimeout(this.timerThreshold);
  
      // Démarrer un nouveau timer
      this.timerThreshold = setTimeout(() => {
        this.vibrate();
        this.isThresholdReached = true;
        this.hasToNavigate = true;
      }, 150);
    } 
    // Si la valeur est fausse
    else if (!value) {
      clearTimeout(this.timerThreshold);
      this.isThresholdReached = false;
    }
  }

  ngOnDestroy(): void {
    this.paramSubscription.unsubscribe();
    this.preloadSubscription.unsubscribe();
  }

  fetchArtwork() {
    this.api.getArtwork(this.artworkId).subscribe((artwork) => {
      this.artwork = artwork;
      this.fetchAuthor();
    });
  }

  fetchChapter() {
    this.api.getChapterById(this.chapterId).subscribe((chapter) => {
      this.chapter = chapter;
      this.fetchNextChapters();
    });
  }

  fetchPages() {
    this.api.getPages(this.artworkId, this.chapterId).subscribe((pages) => {
      this.pages = pages;
      this.sortPages();
    });
  }

  fetchAuthor() {
    this.api.getAuthorData(this.artwork.authorId).subscribe((author) => {
      this.author = author;
    });
  }

  fetchNextChapters() {
    this.api.getAllChaptersByArtworkId(this.artworkId).subscribe((chapters) => {
      this.nextChapters = chapters;
      this.trimChapters();
      this.sortChapters();
    });
  }

  trimChapters() {
    this.nextChapters = this.nextChapters.filter(chapter => chapter.index > this.chapter.index);
  }

  sortChapters() {
    this.nextChapters.sort((a, b) => a.index - b.index);
  }

  fetchShopData() {
    this.api.getShopDataFromArtworkId(this.artworkId).subscribe((shop) => {
      this.shop = shop;
      this.shopComponent?.fetchData();
    });
  }

  sortPages() {
    this.pages = this.pages.sort((a, b) => a.index - b.index);
  }

  //actions for the template

  enterFullScreen() {
    this.fullScreen = true;
    const element = this.liseuseContainer.nativeElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
      return;
    } else if (element.mozRequestFullScreen) { /* Firefox */
      element.mozRequestFullScreen();
      return;
    } else if (element.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
      element.webkitRequestFullscreen();
      return;
    } else if (element.msRequestFullscreen) { /* IE/Edge */
      element.msRequestFullscreen();
      return;
    }
    this.fullScreen = false;
  }

  exitFullScreen() {
    this.fullScreen = false;
    document.exitFullscreen();
  }

  navigateToAuthor() {
    this.router.navigate(['/author', this.author.id]);
  }

  navigateToNextChapter() {
    if(this.nextChapters.length == 0){
      this.navigateToAuthor();
    }
    this.router.navigate(['/mobileview', this.artworkId, this.nextChapters[0].id]);
  }

  touchStart(event: any) {
    this.isFingerOnScreen = true;
  }

  touchEnd(event: any) {
    this.isFingerOnScreen = false;
    if(this.hasToNavigate){
      this.hasToNavigate = false;
      this.navigateToNextChapter();
    }
    if(this.bottomIntersectRatio > 0){
      this.scrollToHideBottom();
    }
  }

  scrollToHideBottom() {
    if(!this.canScroll){
      return;
    }
    const totalHeight = document.body.scrollHeight;
    const windowHeight = window.innerHeight;
    const positionFromTop = totalHeight - 2 * windowHeight;

    window.scrollTo({
      top: positionFromTop,
      behavior: 'smooth'
    });
  }

  //getters for the template

  get title(): string {
    return this.artwork.title || 'Titre';
  }

  get authorName(): string {
    return this.author.user.surname || 'Auteur';
  }

  get shopId(): number {
    return this.shop?.id || 0;
  }

  get spinnerVisibility(): number {
    if(this.bottomIntersectRatio > 0.3){
      return 1;
    }
    return this.bottomIntersectRatio*3;
  }

}
