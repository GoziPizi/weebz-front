import { Component, OnInit } from '@angular/core';
import { ApiHandlerService } from '../../services/api-handler.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  logedIn = true;

  id:number = 0;
  name = "";
  surname = "";
  email = "";

  constructor(
    private api_handler: ApiHandlerService
  )
  {
    this.api_handler.getUserData().subscribe((res: any) => {
      this.id = res.id;
      this.name = res.name;
      this.surname = res.surname;
      this.email = res.email;
    },
    (err: any) => {
      this.logedIn = false;
      this.showErrorMessage();
    });
  }

  ngOnInit(): void {
  }

  showErrorMessage() {

  }

}
