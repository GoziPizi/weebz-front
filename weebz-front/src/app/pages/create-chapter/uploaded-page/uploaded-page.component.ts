import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Page } from '../page';

@Component({
  selector: 'app-uploaded-page',
  templateUrl: './uploaded-page.component.html',
  styleUrls: ['./uploaded-page.component.scss']
})
export class UploadedPageComponent implements OnInit {

  @Input() page!: Page;

  @Output() deleteEvent = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  onDelete() {
    this.deleteEvent.emit(this.page.index);
  }

}
