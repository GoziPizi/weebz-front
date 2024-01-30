import { Component, Input, OnInit } from '@angular/core';
import { Chapter } from 'src/app/models/chapter';
import { Router, RouterModule } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-chapter-thumbnail',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './chapter-thumbnail.component.html',
  styleUrls: ['./chapter-thumbnail.component.scss']
})
export class ChapterThumbnailComponent implements OnInit {

  @Input() chapter: Chapter = new Chapter();
  @Input() type = "MANGA";

  isMobile = this.deviceService.isMobile();

  constructor(
    private router: Router
    , private deviceService: DeviceDetectorService
  ) { }

  ngOnInit(): void {
  }
}
