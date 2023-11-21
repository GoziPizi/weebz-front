import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiHandlerService } from '../services/api-handler.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit {

  @ViewChild('connectedDropdown') dropdown!: Element;
  loggedIn = false;
  private isLoggedInSubscription: Subscription;
  public renderDropdown = false;

  constructor(private api_handler: ApiHandlerService) {
    this.isLoggedInSubscription = this.api_handler.isLoggedIn$.subscribe(valeur => {
      this.loggedIn = valeur;
    });
  }

  ngOnInit(): void {
  }

  onLogout() {
    this.api_handler.logout();
    this.loggedIn = false;
  }

}
