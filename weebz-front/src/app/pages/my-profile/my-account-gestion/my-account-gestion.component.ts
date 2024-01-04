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
        this.isAuthor = true;
        this.author = res;
        this.newPresentation = this.author.presentation;
      },
      error: (err: any) => {
        this.isAuthor = false;
      }
    })
  }

  onEdit() {
    this.isEditing = true;
  }

  onSubmit() {
    this.loading_service.setLoadingState(true);
    const data = {
      presentation: this.newPresentation
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
