import { Component, OnInit } from '@angular/core';
import { ApiHandlerService } from 'src/app/services/api-handler.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingServiceService } from 'src/app/services/loading-service.service';

@Component({
  selector: 'app-inscription',
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
      firstname : ['', Validators.required],
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
          this.router.navigate(['/connexion']);
        },
        (err:any) => {
          this.loading_service.setLoadingState(false);
          this.showErrorMessage();
        }
      )
    }
  }

  showErrorMessage() {
    //TODO
  }

}
