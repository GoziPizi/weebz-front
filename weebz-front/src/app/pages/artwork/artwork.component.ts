import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiHandlerService } from 'src/app/services/api-handler.service';
import { Artwork } from 'src/app/models/artwork';
import { Chapter } from 'src/app/models/chapter';

@Component({
  selector: 'app-artwork',
  templateUrl: './artwork.component.html',
  styleUrls: ['./artwork.component.scss']
})
export class ArtworkComponent implements OnInit {

  artWorkId: number = 0;
  artwork: Artwork = new Artwork();

  authorId: number = 0;
  author: any = {};
  authorRoute: string = "/author/1";

  chapters: Chapter[] = [];

  isFollowing: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private api: ApiHandlerService
  ) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('artworkId');
    if(id != null) {
      this.artWorkId = parseInt(id);
    }
    this.fetchArtworkData();
  }

  noIdGiven() {
  }

  /**
   * Fetches the artwork data from the backend.
   */
  fetchArtworkData() {
    this.api.getArtwork(this.artWorkId).subscribe((res: any) => {
      this.artwork = res;
    },
    (err: any) => this.noIdGiven()
    );
    this.api.getAllChapters(this.artWorkId).subscribe((res: any) => {
      this.onChaptersReceived(res);
    });
  }

  onChaptersReceived(res: any) {
    this.chapters = res;
    this.chapters.sort((a, b) => a.index - b.index);
  }

  fetchAuthorData() {
    return this.api.getAuthorData(this.authorId).subscribe((res: any) => {
      this.author = res;
    });
  }

  //tempmlate actions 

  onFollow(){
    //TODO : follow
    this.isFollowing = !this.isFollowing;
  }

  //getter for the template
  get authorName() {
    if(Object.keys(this.author).length === 0) {
      return "Author";
    }
    return this.author.user.surname;
  }

  get artworkCover() {
    if(Object.keys(this.artwork).length === 0) {
      return "";
    }
    return this.artwork.coverUrl;
  }

}
