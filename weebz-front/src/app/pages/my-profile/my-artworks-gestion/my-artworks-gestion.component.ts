import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/user';
import { Artwork } from 'src/app/models/artwork';
import { ApiHandlerService } from 'src/app/services/api-handler.service';
import { Author } from 'src/app/models/author';
import { LoadingServiceService } from 'src/app/services/loading-service.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-my-artworks-gestion',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './my-artworks-gestion.component.html',
  styleUrls: ['./my-artworks-gestion.component.scss']
})
export class MyArtworksGestionComponent implements OnInit {

  @Input() user$: BehaviorSubject<User> = new BehaviorSubject<User>(new User());

  isAuthor = true;
  author: Author = new Author();

  artworks: Artwork[] = [];

  constructor(
    private api_handler: ApiHandlerService,
    private loadingService: LoadingServiceService,
  ) { }

  ngOnInit(): void {
    this.user$.subscribe({
      next: (res: any) => {
        this.fetchAuthor();
      }
    });
  }

  fetchAuthor() {
    this.loadingService.setLoadingState(true);
    this.api_handler.getAuthorDataFromToken().subscribe({
      next: (res: any) => {
        this.author = res;
        this.fetchArtworks();
      },
      error: (err: any) => {
        this.onNotAuthor();
      },
      complete: () => {
        this.loadingService.setLoadingState(false);
      }
    });
  }

  fetchArtworks() {
    this.api_handler.getAuthorArtworks(this.author.id).subscribe({
      next: (res: any) => {
        this.artworks = res;
      },
      complete: () => {
        this.loadingService.setLoadingState(false);
      }
    });
  }

  onNotAuthor() {
    this.isAuthor = false;
  }
}
