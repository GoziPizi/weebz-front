import { Component } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-unavailable-on-mobile',
  templateUrl: './unavailable-on-mobile.component.html',
  styleUrl: './unavailable-on-mobile.component.scss'
})
export class UnavailableOnMobileComponent {

  display = false;

  constructor(
    private deviceService: DeviceDetectorService
  ) {
    this.display = this.deviceService.isMobile();
  }

}
