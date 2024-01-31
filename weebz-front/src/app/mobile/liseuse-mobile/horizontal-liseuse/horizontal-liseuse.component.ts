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
  isRtl: boolean = false;

  constructor() {
  }

  ngAfterViewInit() {
    console.log(this.pages);
  }

  setRtl(val: boolean) {
    this.isRtl = val;
  }

}
