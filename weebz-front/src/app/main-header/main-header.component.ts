import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiHandlerService } from '../services/api-handler.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';

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

  isMobile = this.deviceService.isMobile();

  constructor(
    private api_handler: ApiHandlerService,
    private router: Router,
    private deviceService: DeviceDetectorService
  ) {
    this.isLoggedInSubscription = this.api_handler.isLoggedIn.subscribe(valeur => {
      this.loggedIn = valeur;
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.isLoggedInSubscription.unsubscribe();
  }

  onLogout() {
    this.api_handler.logout();
    this.loggedIn = false;
  }

  onNavigate(category: string) {
    this.router.navigate(['/search'], { queryParams: { type: category } });
  }

}
