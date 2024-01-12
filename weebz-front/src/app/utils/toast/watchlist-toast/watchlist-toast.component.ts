import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WatchlistService } from 'src/app/services/watchlist.service';

@Component({
  selector: 'app-watchlist-toast',
  templateUrl: './watchlist-toast.component.html',
  styleUrls: ['./watchlist-toast.component.scss']
})
export class WatchlistToastComponent implements OnInit {

  visibleTimer$: Observable<number>;
  toastText$: Observable<string>;
  visible = false;
  text = "";

  constructor(
    private watchlistService: WatchlistService
  ) {
    this.visibleTimer$ = this.watchlistService.getTimerObservable();
    this.toastText$ = this.watchlistService.getTextObservable();
  }

  ngOnInit(): void {
    this.visibleTimer$.subscribe((timer) => {
      if (timer > 0) {
        this.visible = true;
        setTimeout(() => {
          this.visible = false;
        }, timer);
      }
    });
    this.toastText$.subscribe((text) => {
      this.text = text;
    });
  }

}
