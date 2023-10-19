import { Component, OnInit } from '@angular/core';
import { ApiHandlerService } from 'src/app/services/api-handler.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {

  name = "";
  password = "";

  constructor(
    private api_handler: ApiHandlerService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    let data = {
      id: 0,
      name: "string",
      surname: "string",
      birthDate: "string",
      pictureUrl: "string",
      bannerUrl: "string",
      tel: "string",
      email: "string",
      password: "string",
      createdAt: "string",
      lastConnexion: "string"
    }
    console.log(data);
    this.api_handler.createUser(data).subscribe(
      (res: any) => {
        console.log(res);
      }
    )
  }

}
