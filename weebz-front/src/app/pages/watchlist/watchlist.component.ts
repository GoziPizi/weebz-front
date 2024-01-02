import { Component, OnInit } from '@angular/core';
import { Artwork } from 'src/app/models/artwork';
import { ApiHandlerService } from 'src/app/services/api-handler.service';
import { WatchlistService } from 'src/app/services/watchlist.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss']
})
export class WatchlistComponent implements OnInit {

  logged: boolean = false;
  watchlist: Artwork[] = [];

  constructor(
    private apiHandler: ApiHandlerService,
    private watchlistService: WatchlistService
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
    this.watchlistService.updateWatchlist();
    this.watchlistService.updateWatchlist$.subscribe({
      next: res => {
        this.apiHandler.getWatchlist().subscribe({
          next: res => {
            this.watchlist = res.watchlist;
          },
          error: err => {
          }
        })
      }
    })
  }

}
