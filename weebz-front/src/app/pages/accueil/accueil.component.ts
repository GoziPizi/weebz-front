import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {

  isMobile = this.deviceService.isMobile();
  
  constructor(
    private deviceService: DeviceDetectorService
  ) { }

  ngOnInit(): void {
  }

}
