import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { LoadingServiceService } from 'src/app/services/loading-service.service';
import { ApiHandlerService } from 'src/app/services/api-handler.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {

  forgotPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  emailSent: boolean = false;

  constructor(
    private apiHandler: ApiHandlerService,
    private loadingService: LoadingServiceService
  ) { }

  onSubmit() {
    this.loadingService.setLoadingState(true);
    const data = {
      email: this.forgotPasswordForm.value.email,
    }
    this.apiHandler.forgotPassword(data).subscribe({
      next: (data) => {
        this.emailSent = true;
        this.loadingService.setLoadingState(false);
      },
      error: (error) => {
        this.loadingService.setLoadingState(false);
      }
    })
  }

}
