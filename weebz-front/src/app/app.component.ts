import { Component } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'weebz-front';
  isMobile = this.deviceService.isMobile();

  constructor(
    private deviceService: DeviceDetectorService
  ) {
  }
}
