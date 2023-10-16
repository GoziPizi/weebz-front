import { Component, OnInit } from '@angular/core';
import { ApiHandlerService } from '../services/api-handler.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit {

  loggedIn = this.api_handler.isLoggedIn;

  constructor(private api_handler: ApiHandlerService) { }

  ngOnInit(): void {
  }

  onLogout() {
    this.api_handler.logout();
    this.loggedIn = false;
  }

}
