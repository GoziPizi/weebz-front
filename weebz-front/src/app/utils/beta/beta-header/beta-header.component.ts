import { Component } from '@angular/core';
import { BetaService } from '../beta.service';

@Component({
  selector: 'app-beta-header',
  templateUrl: './beta-header.component.html',
  styleUrl: './beta-header.component.scss'
})
export class BetaHeaderComponent {

  isDisplayed: boolean = false;
  isInBetaSubject = this.beta.getBetaSubject();

  constructor(
    private beta: BetaService
  ) {
   this.isInBetaSubject.subscribe({
      next: (res) => {
        this.isDisplayed = !res;
      }
    }) 
  }

  ngOnDestroy() {
    this.isInBetaSubject.unsubscribe();
  }

  onClose() {
    this.isDisplayed = false;
  }

}
