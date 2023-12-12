import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiHandlerService } from 'src/app/services/api-handler.service';
import { Artwork } from 'src/app/models/artwork';

@Component({
  selector: 'app-artwork',
  templateUrl: './artwork.component.html',
  styleUrls: ['./artwork.component.scss']
})
export class ArtworkComponent implements OnInit {

  artWorkId: number = 0;
  artwork: Artwork = new Artwork();

  authorId: number|null = null;
  author: any = {};
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
