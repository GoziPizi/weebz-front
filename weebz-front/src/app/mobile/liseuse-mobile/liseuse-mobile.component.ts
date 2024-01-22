import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';

import { Artwork } from 'src/app/models/artwork';
import { Author } from 'src/app/models/author';
import { Chapter } from 'src/app/models/chapter';
import { Shop } from 'src/app/models/shop';

import { ApiHandlerService } from 'src/app/services/api-handler.service';

@Component({
  selector: 'app-liseuse-mobile',
  templateUrl: './liseuse-mobile.component.html',
  styleUrl: './liseuse-mobile.component.scss'
})
export class LiseuseMobileComponent {

  artworkId : number = 0;
  chapterId : number = 0;

  artwork : Artwork = new Artwork();
  chapter : Chapter = new Chapter();
  author : Author = new Author();
  shop : Shop | null = null;

  pages : any[] = [];
  currentPage$: BehaviorSubject<number> = new BehaviorSubject<number>(1);

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
  }

  reInit(): void {
    this.fetchChapter();
    this.fetchPages();
    this.currentPage$.next(1);
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
    });
  }

  fetchPages() {
    this.api.getPages(this.artworkId, this.chapterId).subscribe((pages) => {
      console.log(pages)
      this.pages = pages;
      this.sortPages();
    });
  }

  fetchAuthor() {
    this.api.getAuthorData(this.artwork.authorId).subscribe((author) => {
      this.author = author;
    });
  }

  fetchShopData() {
    this.api.getShopDataFromArtworkId(this.artworkId).subscribe((shop) => {
      this.shop = shop;
    });
  }

  sortPages() {
    this.pages = this.pages.sort((a, b) => a.index - b.index);
  }

  //actions for the template

  navigateToAuthor() {
    this.router.navigate(['/author', this.author.id]);
  }

  //getters for the template

  get title(): string {
    return this.artwork.title || 'Titre';
  }

  get authorName(): string {
    return this.author.user.surname || 'Auteur';
  }
}
