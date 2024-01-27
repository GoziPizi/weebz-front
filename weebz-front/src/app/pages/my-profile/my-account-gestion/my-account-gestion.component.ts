import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Author } from 'src/app/models/author';
import { User } from 'src/app/models/user';
import { ApiHandlerService } from 'src/app/services/api-handler.service';
import { LoadingServiceService } from 'src/app/services/loading-service.service';

@Component({
  selector: 'app-my-account-gestion',
  templateUrl: './my-account-gestion.component.html',
  styleUrls: ['./my-account-gestion.component.scss']
})
export class MyAccountGestionComponent implements OnInit {

  constructor(
    private api_handler: ApiHandlerService,
    public loading_service: LoadingServiceService
  ) { }

  @Input() user$: BehaviorSubject<User> = new BehaviorSubject<User>(new User());
  user: User = new User();
  
  isAuthor = false;
  author: Author = new Author();

  newPresentation = "";
  isEditing = false;

  instaUrl: string = '';
  xUrl: string = '';
  tiktokUrl: string = '';
  threadsUrl: string = '';

  ngOnInit(): void {
    this.user$.subscribe({
      next: (res: any) => {
        this.user = res;
        this.fetchAuthor();
      }
    });
  }

  fetchAuthor() {
    return this.api_handler.getAuthorDataFromToken().subscribe({
      next: (res: any) => {
        if(res == null) {
          this.isAuthor = false;
          return;
        }
        this.isAuthor = true;
        this.author = res;
        this.newPresentation = this.author.presentation;
        this.populateSocialNetworks();
      },
      error: (err: any) => {
        this.isAuthor = false;
      }
    })
  }

  populateSocialNetworks() {
    this.author.socialNetworks.forEach((network: string) => {
      if (network.includes('instagram')) {
        this.instaUrl = network;
      }
      if (network.includes('x.com')) {
        this.xUrl = network;
      }
      if (network.includes('tiktok')) {
        this.tiktokUrl = network;
      }
      if (network.includes('threads')) {
        this.threadsUrl = network;
      }
    });
  }

  onEdit() {
    this.isEditing = true;
  }

  createSocialNetworks() {
    let networks = [];
    if (this.instaUrl != '') {
      networks.push(this.instaUrl);
    }
    if (this.xUrl != '') {
      networks.push(this.xUrl);
    }
    if (this.tiktokUrl != '') {
      networks.push(this.tiktokUrl);
    }
    if (this.threadsUrl != '') {
      networks.push(this.threadsUrl);
    }
    return networks;
  }

  onSubmit() {
    this.loading_service.setLoadingState(true);
    const data = {
      presentation: this.newPresentation,
      socialNetworks: this.createSocialNetworks()
    }
    return this.api_handler.updateAuthorData(this.author.id, data).subscribe({
      next: (res: any) => {
        this.author = res;
        this.isEditing = false;
        this.loading_service.setLoadingState(false);
      },
      error: (err: any) => {
        //TODO: handle error
        this.loading_service.setLoadingState(false);
      }
    })
  }

}
