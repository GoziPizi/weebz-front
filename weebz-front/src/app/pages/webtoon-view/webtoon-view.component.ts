import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FullscreenService } from 'src/app/services/fullscreen.service';

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

  artworkTitle: string = "Webtoon View";

  isFullScreen: boolean = false;
  private unsubscribeFullscreen: () => void;

  constructor(
    private fullscreenService: FullscreenService
  ) {
    this.unsubscribeFullscreen = this.fullscreenService.onFullscreenChange(() => {
      this.isFullScreen = !!document.fullscreenElement;
    });
  }



  ngOnInit(): void {
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
      this.centerPage();
    }
  }

  centerPage() {
    const componentPosition = this.liseuseContainer.nativeElement.offsetTop;
    const screenHeight = window.innerHeight;

    // Calculer la position de défilement pour centrer le composant
    const scrollToPosition = componentPosition - (screenHeight / 2) + (this.liseuseContainer.nativeElement.offsetHeight / 2);

    window.scrollTo({
        top: scrollToPosition,
        behavior: 'smooth'  // Pour un défilement en douceur
    });
  }

}
