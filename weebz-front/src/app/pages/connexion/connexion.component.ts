import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiHandlerService } from 'src/app/services/api-handler.service';
import { LoadingServiceService } from 'src/app/services/loading-service.service';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {

  email: string = "";
  password: string = "";
  errorMessageShown: boolean = false;
  callback: string = "";

  constructor(
    private api_handler: ApiHandlerService,
    private router: Router,
    private loading_service: LoadingServiceService
    ) { }

  ngOnInit(): void {
    this.setLoadingState(false);
  }

  onSubmit() {
    this.setLoadingState(true);
    this.api_handler.login({login: this.email, password: this.password}).subscribe(
      (data: any) => {
        this.setLoadingState(false);
        this.router.navigate([this.callback]);
      },
      (error: any) => {
        this.showErrorMessage();
        this.setLoadingState(false);
      }
      );
  }

  showErrorMessage() {
    this.errorMessageShown = true;
  }

  setLoadingState(state: boolean){
    this.loading_service.setLoadingState(state);
  }

}
