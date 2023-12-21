import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FullscreenService } from 'src/app/services/fullscreen.service';
import { ApiHandlerService } from 'src/app/services/api-handler.service';
import { ActivatedRoute } from '@angular/router';
import { Artwork } from 'src/app/models/artwork';
import { Page } from '../create-chapter/page';

@Component({
  selector: 'app-webtoon-view',
  templateUrl: './webtoon-view.component.html',
  styleUrls: ['./webtoon-view.component.scss']
})
export class WebtoonViewComponent implements OnInit {

  @ViewChild('liseuseContainer') liseuseContainer!: ElementRef;

  pages: any[] = []

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
      this.chapterIndex = params['chapterId'];
    });
    this.fetchArtwork();
    this.fetchPages();
  }

  fetchArtwork() {
    return this.apiHandler.getArtwork(this.artworkId).subscribe({
      next: (artwork: Artwork) => {
        this.artwork = artwork;
      },
      error: (error: any) => {
      }
    })
  }

  fetchPages() {
    return this.apiHandler.getPages(this.artworkId, this.chapterIndex).subscribe({
      next: (pages) => {
        this.pages = pages;
        this.sortPages();
      },
      error: (error: any) => {
      }
    })
  }

  sortPages() {
    this.pages.sort((a, b) => a.index - b.index);
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
