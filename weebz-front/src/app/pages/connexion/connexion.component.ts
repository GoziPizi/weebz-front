import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiHandlerService } from 'src/app/services/api-handler.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {

  email: string = "";
  password: string = "";
  errorMessageShown: boolean = false;
  loading: boolean = false;
  callback: string = "";

  constructor(
    private api_handler: ApiHandlerService,
    private router: Router  
    ) { }

  ngOnInit(): void { }

  onSubmit() {
    this.setLoadingState(true);
    this.api_handler.login({login: this.email, password: this.password}).subscribe(
      (data: any) => {
        console.log('a');
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
    console.log("setLoadingState to " + state)
    this.loading = state;
  }

}
