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
  synopsis: string = "Synopsis";
  cover: string = "Cover"; //url of the cover
  background: string = "../assets/test-news.png"; //url of the background
  tags: string[] = ["tag"];
  rating: number = 0;
  numberOfChapters: number = 0;
  viewCount: number = 0;

  authorId: number|null = null;
  author: string = "Author";
  authorRoute: string = "/author/1";

  chapters: any[] = [];

  isDragging: boolean = false;
  startX: number = 0;
  currentTranslateX: number = 0;

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
    this.fetchAuthorData();
  }

  noIdGiven() {
    console.log("No artwork id given");
  }

  /**
   * Fetches the artwork data from the backend.
   */
  fetchArtworkData() {
    this.api.getArtwork(this.artWorkId).subscribe((res: any) => {
      this.onArtworkReceived(res);
    },
    (err: any) => this.noIdGiven()
    );
    this.api.getAllChapters(this.artWorkId).subscribe((res: any) => {
      console.log(res);
      this.onChaptersReceived(res);
    });
  }

  onArtworkReceived(res: any) {
    this.title = res.title;
    this.synopsis = res.description;
    this.cover = res.coverUrl;
    this.background = res.backgroundImageUrl;
    this.tags = res.tags;
    this.rating = res.rating;
  }

  onChaptersReceived(res: any) {
    this.chapters = res;
    this.chapters.sort((a, b) => a.index - b.index);
  }

  fetchAuthorData() {

  }

  onMouseDown(event: MouseEvent): void {
    this.isDragging = true;
    this.startX = event.clientX;
    //event.preventDefault();
  }

  //TODO ne pas le laisser aller trop loin

  onMouseUp(event: MouseEvent): void {
    this.isDragging = false;
    if(this.currentTranslateX > 0) {
      this.currentTranslateX = 0;
    }
  }

  onMouseMove(event: MouseEvent): void {
    if (!this.isDragging) return;
    const x = event.clientX;
    const delta = x - this.startX;
    this.currentTranslateX += delta;
    this.startX = x;
  }

  onWheel(event: WheelEvent): void {
    const sensitivity = 2;
    
    this.currentTranslateX -= event.deltaY * sensitivity;

    if(this.currentTranslateX > 0) {
      this.currentTranslateX = 0;
    }

    //Si il n'y a plus de contenu dans la page, alors on ne peut pas aller plus loin

    event.preventDefault();
}

  getTranslateX(): string {
    return `translateX(${this.currentTranslateX}px)`;
  }

}
