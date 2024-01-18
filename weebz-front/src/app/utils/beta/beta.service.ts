import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ApiHandlerService } from 'src/app/services/api-handler.service';
import { LoadingServiceService } from 'src/app/services/loading-service.service';

@Injectable({
  providedIn: 'root'
})
export class BetaService {

  isInBeta$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedInSubscription: any;

  constructor(
    private api: ApiHandlerService,
    private loadingService: LoadingServiceService
  ) {
    this.checkBeta();
    this.isLoggedInSubscription = this.api.isLoggedIn$.subscribe({
      next: (res: boolean) => {
        this.checkBeta();
      }
    })
  }

  checkBeta() {
    this.api.isInBeta().subscribe({
      next: (res) => {
        this.isInBeta$.next(res);
      },
      error: (err) => {
      }
    })
  }

  getBetaSubject() {
    return this.isInBeta$;
  }

  enrollInBeta() {
    this.loadingService.setLoadingState(true);
    const data = {
      id: this.api.getUser().id,
    }
    this.api.enrollToBeta(data).subscribe({
      next: (res) => {
        this.isInBeta$.next(true);
        this.loadingService.setLoadingState(false);
      },
      error: (err) => {
        this.loadingService.setLoadingState(false);
      }
    })
  }

  leaveBeta() {
    this.loadingService.setLoadingState(true);
    const data = {
      id: this.api.getUser().id,
    }
    return this.api.leaveBeta(data).subscribe({
      next: (res) => {
        this.isInBeta$.next(false);
        this.loadingService.setLoadingState(false);
      },
      error: (err) => {
        this.loadingService.setLoadingState(false);
      }
    })
  }
}
