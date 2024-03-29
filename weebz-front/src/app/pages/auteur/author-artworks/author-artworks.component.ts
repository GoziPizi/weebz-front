import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Artwork } from 'src/app/models/artwork';
import { Author } from 'src/app/models/author';
import { ApiHandlerService } from 'src/app/services/api-handler.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-author-artworks',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './author-artworks.component.html',
  styleUrls: ['./author-artworks.component.scss']
})
export class AuthorArtworksComponent implements OnInit {

  @Input() author$: BehaviorSubject<Author> = new BehaviorSubject<Author>(new Author());
  localAuthor: Author = new Author();

  artworks: Artwork[] = [];

  constructor(
    private apiHandler: ApiHandlerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.author$.subscribe({
      next: (data: Author) => {
        this.localAuthor = data;
        if(this.localAuthor.id != 0 && this.localAuthor.id != undefined) {
          this.fetchArtworks();
        }
      }
    })
  }

  fetchArtworks() {
    this.apiHandler.getAuthorArtworks(this.localAuthor.id).subscribe({
      next: (data: any) => {
        this.artworks = data;
      }
    })
  }

}
