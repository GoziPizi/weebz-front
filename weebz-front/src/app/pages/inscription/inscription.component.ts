import { Component, OnInit } from '@angular/core';
import { ApiHandlerService } from 'src/app/services/api-handler.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {

  registrationForm: FormGroup;

  constructor(
    private api_handler: ApiHandlerService,
    private fb: FormBuilder
  ) {
    this.registrationForm = this.fb.group({
      email : ['', Validators.required],
      name : ['', Validators.required],
      surname : ['', Validators.required],
      password : ['', Validators.required],
      confirm_password : ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  onSubmit(){

  }

}
