import { Component, ViewChild } from '@angular/core';
import { ApiHandlerService } from 'src/app/services/api-handler.service';

@Component({
  selector: 'app-mobile-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class MobileHeaderComponent {

  @ViewChild('sideMenu') sideMenu: any;

  isLoggedIn: boolean = false;
  loggedInSubscription = this.apiHandler.isLoggedIn$.subscribe({
    next: (value) => {
      this.isLoggedIn = value;
    }
  })

  isMenuOpen: boolean = false;

  constructor(private apiHandler: ApiHandlerService) { }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    this.apiHandler.logout();
  }

}
