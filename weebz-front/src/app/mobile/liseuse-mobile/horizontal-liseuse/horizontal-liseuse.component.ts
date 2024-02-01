import { CommonModule } from '@angular/common';
import { Component, Input, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { register as registerSwiperElements } from 'swiper/element/bundle';

registerSwiperElements();

@Component({
  selector: 'app-horizontal-liseuse',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './horizontal-liseuse.component.html',
  styleUrl: './horizontal-liseuse.component.scss'
})
export class HorizontalLiseuseComponent {

  @Input() pages: any[] = [];
  currentPage: number = 0;
  @Input()isRtl: boolean = false;

  constructor() {
  }

  ngAfterViewInit() {
  }

  get rtl() {
    console.log("rtl: " + this.isRtl);
    return this.isRtl;
  }

}
