import { Component, OnInit } from '@angular/core';
import { ApiHandlerService } from 'src/app/services/api-handler.service';

@Component({
  selector: 'app-connected-dropdown',
  templateUrl: './connected-dropdown.component.html',
  styleUrls: ['./connected-dropdown.component.scss']
})
export class ConnectedDropdownComponent implements OnInit {

  pseudo: string = "Pseudo";
  profilePicture: string = "../../../assets/profile_picture.png";

  constructor(
    private apiHandlerService: ApiHandlerService
  ) { }

  ngOnInit(): void {
  }

  onDisconnect() {
    this.apiHandlerService.logout();
  }

}
