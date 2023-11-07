import { Component, OnInit } from '@angular/core';
import { ApiHandlerService } from 'src/app/services/api-handler.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss']
})
export class WatchlistComponent implements OnInit {

  logged: boolean = false;

  constructor(
    private apiHandler: ApiHandlerService
  ) {
    this.logged = this.apiHandler.getIsLoggedIn()
  }

  ngOnInit(): void {
    
  }

}
