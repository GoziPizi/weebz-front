import { Component } from '@angular/core';
import { BetaService } from '../beta.service';

@Component({
  selector: 'app-beta-page',
  templateUrl: './beta-page.component.html',
  styleUrl: './beta-page.component.scss'
})
export class BetaPageComponent {

  betaSubscription: any;
  isInBeta: boolean = false;

  constructor(
    private betaService: BetaService
  ) {
    this.betaSubscription = this.betaService.getBetaSubject().subscribe((res: boolean) => {
      this.isInBeta = res;
    });
  }

  onButtonEnroll() {
    if (this.isInBeta) {
      this.betaService.leaveBeta();
    }
    else {
      this.betaService.enrollInBeta();
    }
  }

}
