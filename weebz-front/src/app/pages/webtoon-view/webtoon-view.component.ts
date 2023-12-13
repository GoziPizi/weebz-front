import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FullscreenService } from 'src/app/services/fullscreen.service';
import { ApiHandlerService } from 'src/app/services/api-handler.service';
import { ActivatedRoute } from '@angular/router';
import { Artwork } from 'src/app/models/artwork';

@Component({
  selector: 'app-webtoon-view',
  templateUrl: './webtoon-view.component.html',
  styleUrls: ['./webtoon-view.component.scss']
})
export class WebtoonViewComponent implements OnInit {

  @ViewChild('liseuseContainer') liseuseContainer!: ElementRef;

  images: string[] = [
    "../../../assets/fixtures/webtoonview/1.jpg"
  ]

  artworkId: number = 0;
  artwork: Artwork = new Artwork();
  chapterIndex: number = 0;

  isFullScreen: boolean = false;
  private unsubscribeFullscreen: () => void;

  constructor(
    private fullscreenService: FullscreenService,
    private route: ActivatedRoute,
    private apiHandler: ApiHandlerService
  ) {
    this.unsubscribeFullscreen = this.fullscreenService.onFullscreenChange(() => {
      this.isFullScreen = !!document.fullscreenElement;
    });
  }



  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.artworkId = params['artworkId'];
      this.chapterIndex = params['chapter'];
    });
  }

  fetchArtwork() {
    return this.apiHandler.getArtwork(this.artworkId).subscribe({
      next: (artwork: Artwork) => {
        this.artwork = artwork;
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  fetchPages() {
    return this.apiHandler.getPages(this.artworkId, this.chapterIndex).subscribe({
      next: (pages: string[]) => {
        this.images = pages;
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  ngOnDestroy() {
    this.unsubscribeFullscreen();
  }

  toggleFullScreen() {
    this.isFullScreen = !this.isFullScreen;
    if(this.isFullScreen) {
      this.fullscreenService.enterFullscreen(this.liseuseContainer.nativeElement);
    } else {
      this.fullscreenService.exitFullscreen();
    }
  }

  //getters of the templaye 
  get artworkTitle() {
    if(this.artwork.id == 0){
      return "Titre"
    }
    return this.artwork.title;
  }

}
