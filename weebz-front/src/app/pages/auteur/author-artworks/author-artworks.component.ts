import { Component, Input, OnInit } from '@angular/core';
import { ApiHandlerService } from 'src/app/services/api-handler.service';


@Component({
  selector: 'app-author-artworks',
  templateUrl: './author-artworks.component.html',
  styleUrls: ['./author-artworks.component.scss']
})
export class AuthorArtworksComponent implements OnInit {

  @Input() author: any = {};

  constructor(
    private apiHandler: ApiHandlerService
  ) { }

  ngOnInit(): void {
    this.fetchArtworks();
  }

  fetchArtworks() {
    this.apiHandler.getAuthorArtworks(this.author.id).subscribe({
      next: (data: any) => {
        console.log(data)
        this.author.artworks = data;
      }
    })
  }

}
