import { Component, OnInit, ViewChild } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ApiHandlerService } from 'src/app/services/api-handler.service';
import { WatchlistService } from 'src/app/services/watchlist.service';
import { Router } from '@angular/router';
import { Artwork } from 'src/app/models/artwork';
import { Chapter } from 'src/app/models/chapter';
import { Shop } from 'src/app/models/shop';
import { FourProductsShopThumbnailComponent } from 'src/app/utils/thumbnails/shop-thumbnails/four-products-shop-thumbnail/four-products-shop-thumbnail.component';
import { Author } from 'src/app/models/author';

@Component({
  selector: 'app-artwork',
  templateUrl: './artwork.component.html',
  styleUrls: ['./artwork.component.scss']
})
export class ArtworkComponent implements OnInit {

  artWorkId: number = 0;
  artwork: Artwork = new Artwork();

  authorId: number = 0;
  author: Author = new Author();

  chapters: Chapter[] = [];

  shop: Shop|null = null;
  @ViewChild('shopComponent') shopComponent: FourProductsShopThumbnailComponent|null = null;

  isFollowing: boolean = false;

  isMobile: boolean = this.deviceService.isMobile();

  constructor(
    private route: ActivatedRoute,
    private api: ApiHandlerService,
    private router: Router,
    private watchlistService: WatchlistService,
    public deviceService: DeviceDetectorService,
    private titleService: Title,
    private metaService: Meta
  ) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('artworkId');
    if(id != null) {
      this.artWorkId = parseInt(id);
    }
    this.fetchArtworkData();
    this.fetchShopData();
    this.isFollowing = this.watchlistService.isArtworkInWatchlist(this.artWorkId);
  }

  noIdGiven() {
  }

  /**
   * Fetches the artwork data from the backend.
   */
  fetchArtworkData() {
    this.api.getArtwork(this.artWorkId).subscribe((res: any) => {
      this.artwork = res;
      this.authorId = res.authorId;
      this.fetchAuthorData();
      this.setMetaData();
    },
    (err: any) => this.noIdGiven()
    );
    this.api.getAllChapters(this.artWorkId).subscribe((res: any) => {
      this.onChaptersReceived(res);
    });
  }

  setMetaData() {
    this.titleService.setTitle("WeebZ - " + this.artwork.title);
    this.metaService.updateTag({name: "description", content: this.artwork.description});
    this.metaService.updateTag({name: "keywords", content: this.artwork.tags.join(", ") + ", " + this.artwork.type + ", " + this.artwork.title + "manga, webtoon, lightnovel, lecture, gratuit, papier, boutique, goodies, achat, vente, partage, communauté, fan, "});
  }

  onChaptersReceived(res: any) {
    this.chapters = res;
    this.chapters.sort((a, b) => a.index - b.index);
  }

  fetchAuthorData() {
    return this.api.getAuthorData(this.authorId).subscribe((res: any) => {
      this.author = res;
    });
  }

  fetchShopData() {
    return this.api.getShopDataFromArtworkId(this.artWorkId).subscribe((res: any) => {
      this.shop = res;
      this.shopComponent?.fetchData();
    });
  }

  //tempmlate actions 

  onFollow(){
    if(this.isFollowing) {
      this.watchlistService.removeArtwork(this.artWorkId);
    } else {
      this.watchlistService.addArtwork(this.artWorkId);
    }
    this.isFollowing = !this.isFollowing;
  }

  navigateToAuthor() {
    this.router.navigate(['/author', this.authorId]);
  }

  //getter for the template
  get authorName() {
    if(Object.keys(this.author).length === 0) {
      return "Author";
    }
    return this.author.user.surname;
  }

  get artworkCover() {
    if(Object.keys(this.artwork).length === 0) {
      return "";
    }
    return this.artwork.coverUrl;
  }

  get artworkType() {
    if(Object.keys(this.artwork).length === 0) {
      return "MANGA";
    }
    return this.artwork.type;
  }

}
