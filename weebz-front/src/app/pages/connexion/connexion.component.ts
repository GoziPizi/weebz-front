import { Component, OnInit } from '@angular/core';
import { ApiHandlerService } from 'src/app/services/api-handler.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {

  email: string = "";
  password: string = "";

  constructor(private api_handler: ApiHandlerService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.api_handler.login({login: this.email, password: this.password}).subscribe((res: any) => {
      console.log(res);
    });
  }

}
