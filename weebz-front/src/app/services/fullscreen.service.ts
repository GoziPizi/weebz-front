import { Injectable, NgZone } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FullscreenService {

  constructor(private ngZone: NgZone) { }

  // Passer en mode plein écran
  enterFullscreen(element: HTMLElement) {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if ((element as any).mozRequestFullScreen) { /* Firefox */
      (element as any).mozRequestFullScreen();
    } else if ((element as any).webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      (element as any).webkitRequestFullscreen();
    } else if ((element as any).msRequestFullscreen) { /* IE/Edge */
      (element as any).msRequestFullscreen();
    }
  }

  // Quitter le mode plein écran
  exitFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if ((document as any).mozCancelFullScreen) { /* Firefox */
      (document as any).mozCancelFullScreen();
    } else if ((document as any).webkitExitFullscreen) { /* Chrome, Safari and Opera */
      (document as any).webkitExitFullscreen();
    } else if ((document as any).msExitFullscreen) { /* IE/Edge */
      (document as any).msExitFullscreen();
    }
  }

  onFullscreenChange(callback: () => void) {
    const wrappedCallback = () => this.ngZone.run(callback);
    
    document.addEventListener('fullscreenchange', wrappedCallback);
    document.addEventListener('webkitfullscreenchange', wrappedCallback);
    document.addEventListener('mozfullscreenchange', wrappedCallback);
    document.addEventListener('MSFullscreenChange', wrappedCallback);

    return () => {
      document.removeEventListener('fullscreenchange', wrappedCallback);
      document.removeEventListener('webkitfullscreenchange', wrappedCallback);
      document.removeEventListener('mozfullscreenchange', wrappedCallback);
      document.removeEventListener('MSFullscreenChange', wrappedCallback);
    };
  }
}