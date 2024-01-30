import { Component, OnInit } from '@angular/core';
import { ApiHandlerService } from 'src/app/services/api-handler.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingServiceService } from 'src/app/services/loading-service.service';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {

  registrationForm: FormGroup;

  constructor(
    private api_handler: ApiHandlerService,
    private fb: FormBuilder,
    private router: Router,
    private loading_service: LoadingServiceService
  ) {
    this.registrationForm = this.fb.group({
      email : ['', Validators.required],
      name : ['', Validators.required],
      firstName : ['', Validators.required],
      surname : ['', Validators.required],
      password : ['', Validators.required],
      confirm_password : ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  onSubmit(){
    this.loading_service.setLoadingState(true);
    if(this.registrationForm.valid){
      this.api_handler.register(this.registrationForm.value).subscribe(
        (res:any) => {
          this.loading_service.setLoadingState(false);
          this.connect();
        },
        (err:any) => {
          this.loading_service.setLoadingState(false);
          this.showErrorMessage();
        }
      )
    }
  }

  connect(){
    this.loading_service.setLoadingState(true);
    const data = {
      login: this.registrationForm.value.email,
      password: this.registrationForm.value.password
    }
    this.api_handler.login(data).subscribe({
      next: (res:any) => {
        this.loading_service.setLoadingState(false);
        this.router.navigate(['/accueil']);
      },
      error: (err:any) => {
        this.loading_service.setLoadingState(false);
        this.showErrorMessage();
      }
    })
  }

  showErrorMessage() {
    //TODO
  }

}
