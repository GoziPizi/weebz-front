import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MondialRelayScriptLoadingService {

  loadScript(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = url;
      script.onload = () => resolve();
      script.onerror = () => reject();
      document.body.appendChild(script);
    });
  }

  loadJQueryAndWidget(jqueryUrl: string, widgetUrl: string): Promise<void> {
    return this.loadScript(jqueryUrl).then(() => this.loadScript(widgetUrl));
  }
}
