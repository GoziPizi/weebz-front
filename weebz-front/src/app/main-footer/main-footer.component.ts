import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-main-footer',
  templateUrl: './main-footer.component.html',
  styleUrls: ['./main-footer.component.scss']
})
export class MainFooterComponent implements OnInit {

  isMobile = this.deviceService.isMobile();

  constructor(
    private router: Router,
    private deviceService: DeviceDetectorService
  ) { }

  ngOnInit(): void {
  }

}
