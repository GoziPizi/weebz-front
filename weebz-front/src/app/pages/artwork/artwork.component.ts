import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiHandlerService } from 'src/app/services/api-handler.service';

@Component({
  selector: 'app-artwork',
  templateUrl: './artwork.component.html',
  styleUrls: ['./artwork.component.scss']
})
export class ArtworkComponent implements OnInit {

  /**
   * A component that displays the presentation of an artwork. 
   * It is made of : 
   *  - The title of the artwork
   *  - The author of the artwork
   *  - The synopsis of the artwork
   *  - The cover of the artwork
   *  - The tags of the artwork
   *  - The rating of the artwork TODO
   *  - The list of chapters of the artwork, each "chapter" is a chapter thumbnail.
   */

  artWorkId: number = 0;
  title: string = "Title";
  author: string = "Author";
  synopsis: string = "Synopsis";
  cover: string = "Cover"; //url of the cover
  tags: string[] = ["tag"];
  rating: number = 0;
  numberOfChapters: number = 0;

  synopsisTemp = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

  constructor(
    private route: ActivatedRoute,
    private api: ApiHandlerService
  ) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('artworkId');
    if(id != null) {
      this.artWorkId = parseInt(id);
    } else {
      this.noIdGiven();
    }
    this.fetchArtworkData();
  }

  noIdGiven() {
    console.log("No artwork id given");
  }

  /**
   * Fetches the artwork data from the backend.
   */
  fetchArtworkData() {
    this.api.getArtWork(this.artWorkId).subscribe((res: any) => {
      this.title = res.title;
      this.author = res.author;
      this.synopsis = res.synopsis;
      this.cover = res.cover;
      this.tags = res.tags;
      this.rating = res.rating;
      this.numberOfChapters = res.numberOfChapters;
    },
    (err: any) => {
      this.noIdGiven();
    }
    );
  }

}
