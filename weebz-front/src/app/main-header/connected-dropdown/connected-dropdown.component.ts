import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApiHandlerService } from 'src/app/services/api-handler.service';

@Component({
  selector: 'app-connected-dropdown',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './connected-dropdown.component.html',
  styleUrls: ['./connected-dropdown.component.scss']
})
export class ConnectedDropdownComponent implements OnInit {

  surname: string = "Pseudo";
  profilePicture: string = "../../../assets/profile_picture.png";

  constructor(
    private apiHandlerService: ApiHandlerService
  ) {
    this.apiHandlerService.user$.subscribe((user: any) => {
      this.surname = user.surname;
      if(user.pictureUrl != ""){
        this.profilePicture = user.pictureUrl;
      }
    });
  }

  ngOnInit(): void {
  }

  onDisconnect() {
    this.apiHandlerService.logout();
  }

}
