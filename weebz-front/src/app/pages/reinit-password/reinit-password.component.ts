import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { LoadingServiceService } from 'src/app/services/loading-service.service';
import { ApiHandlerService } from 'src/app/services/api-handler.service';

@Component({
  selector: 'app-reinit-password',
  templateUrl: './reinit-password.component.html',
  styleUrl: './reinit-password.component.scss'
})
export class ReinitPasswordComponent {

  token: string = '';
  private queryParamSubscription: Subscription;

  reinitPasswordForm = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  constructor(
    private apiHandler: ApiHandlerService,
    private router: Router,
    private route: ActivatedRoute,
    private loadingService: LoadingServiceService
  ) {
    this.queryParamSubscription = this.route.queryParams.subscribe(params => {
      this.token = params['token'];
    });
  }

  onSubmit() {
    this.loadingService.setLoadingState(true);
    if (this.reinitPasswordForm.value.password !== this.reinitPasswordForm.value.passwordConfirm) {
      this.loadingService.setLoadingState(false);
      return;
    }
    const data = {
      token: this.token,
      password: this.reinitPasswordForm.value.password,
    }
    this.apiHandler.resetPassword(data).subscribe({
      next: (data) => {
        this.loadingService.setLoadingState(false);
        this.router.navigate(['/connexion']);
      },
      error: (error) => {
        this.loadingService.setLoadingState(false);
      }
    })
  }

  ngOnDestroy() {
    this.queryParamSubscription.unsubscribe();
  }
}
