import { Component, OnInit } from '@angular/core';
import { Artwork } from 'src/app/models/artwork';
import { ApiHandlerService } from 'src/app/services/api-handler.service';
import { WatchlistService } from 'src/app/services/watchlist.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { CommonModule } from '@angular/common';
import { ArtworkThumbnailComponent } from 'src/app/utils/thumbnails/artwork-thumbnail/artwork-thumbnail.component';

@Component({
  selector: 'app-watchlist',
  standalone: true,
  imports: [CommonModule, ArtworkThumbnailComponent],
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss']
})
export class WatchlistComponent implements OnInit {

  logged: boolean = false;
  watchlist: Artwork[] = [];

  isMobile: boolean = this.deviceService.isMobile();

  constructor(
    private apiHandler: ApiHandlerService,
    private watchlistService: WatchlistService,
    private deviceService: DeviceDetectorService
  ) {
    this.apiHandler.checkLogin().subscribe({
      next: res => {
        this.logged = true;
      },
      error: err => {
        this.logged = false;
      }
    })
  }

  ngOnInit(): void {
    this.watchlistService.getUpdateWatchlistObservable().subscribe({
      next: () => {
        this.watchlist = this.watchlistService.getWatchlist();
      }
    })
  }

}
