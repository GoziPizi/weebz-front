import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';

import { Artwork } from 'src/app/models/artwork';
import { Author } from 'src/app/models/author';

import { ApiHandlerService } from 'src/app/services/api-handler.service';
import { WatchlistService } from 'src/app/services/watchlist.service';

@Component({
  selector: 'app-artwork-thumbnail',
  templateUrl: './artwork-thumbnail.component.html',
  styleUrls: ['./artwork-thumbnail.component.scss']
})
export class ArtworkThumbnailComponent implements OnInit {

  @Input() artwork: Artwork = new Artwork();
  author: Author = new Author();

  faved: boolean = false;

  isMobile: boolean = this.deviceService.isMobile();

  constructor(
    private router: Router,
    private apiHandler: ApiHandlerService,
    private watchlistService: WatchlistService,
    private deviceService: DeviceDetectorService
  ) { }

  ngOnInit(): void {
    this.fetchAuthor();
    this.watchlistService.updateWatchlist$.subscribe({
      next: () => {
        this.faved = this.watchlistService.isArtworkInWatchlist(this.artwork.id);
      }
    })
  }

  fetchAuthor(){
    this.apiHandler.getAuthorData(this.artwork.authorId).subscribe({
      next: res => {
        this.author = res;
      }
    })
  }

  navigate(){
    this.router.navigate(['/artwork/'+this.artwork.id])
  }

  onFav(event: any){
    if(!this.faved){
      this.watchlistService.addArtwork(this.artwork.id);
      this.faved = true;
    }
    else{
      this.watchlistService.removeArtwork(this.artwork.id);
      this.faved = false;
    }
    event.stopPropagation();
  }

}
