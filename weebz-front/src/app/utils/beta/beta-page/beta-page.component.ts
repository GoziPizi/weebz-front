import { Component } from '@angular/core';
import { BetaService } from '../beta.service';
import { ApiHandlerService } from 'src/app/services/api-handler.service';

@Component({
  selector: 'app-beta-page',
  templateUrl: './beta-page.component.html',
  styleUrl: './beta-page.component.scss'
})
export class BetaPageComponent {

  betaSubscription: any;
  loggedInSubscription: any;
  isLogged: boolean = false;
  isInBeta: boolean = false;

  constructor(
    private betaService: BetaService,
    private apiHandler: ApiHandlerService
  ) {
    this.betaSubscription = this.betaService.getBetaSubject().subscribe((res: boolean) => {
      this.isInBeta = res;
    });
    this.loggedInSubscription = this.apiHandler.isLoggedIn.subscribe((res: boolean) => {
      this.isLogged = res;
    });
  }

  ngOnDestroy() {
    this.betaSubscription.unsubscribe();
  }

  onButtonEnroll() {
    if(!this.isLogged) {
      return;
    }
    if (this.isInBeta) {
      this.betaService.leaveBeta();
    }
    else {
      this.betaService.enrollInBeta();
    }
  }

}
