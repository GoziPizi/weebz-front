import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Page } from '../../create-chapter/page';

@Component({
  selector: 'app-uploaded-page',
  templateUrl: './uploaded-page.component.html',
  styleUrls: ['./uploaded-page.component.scss']
})
export class UploadedPageComponent implements OnInit {

  @Input() page!: Page;

  @Input() changeIndexStream: 
    EventEmitter<{indexPageOrigin: number, indexPageToExchange: number}> 
    = new EventEmitter<{indexPageOrigin: number, indexPageToExchange: number}>();

  @Output() deleteEvent = new EventEmitter<number>();

  @ViewChild('inputPageIndex') inputPageIndex!: ElementRef;

  pageSelectMode: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  onDelete($event: any) {
    this.deleteEvent.emit(this.page.index);
    $event.stopPropagation();
  }

  onPageSelectMode($event: any) {
    $event.stopPropagation();
    this.pageSelectMode = !this.pageSelectMode;
    setTimeout(() => {
      this.inputPageIndex.nativeElement.select();
    }, 0);
    this.inputPageIndex.nativeElement.focus();
  }

  onInputBlur() {
    this.pageSelectMode = false;
  }

  handleKeyPress($event: any) {
    if ($event.key === 'Enter') {
      const input = $event.target as HTMLInputElement;
      const pageIndex = parseInt(input.value);
      this.pageSelectMode = false;
      this.onSwapPage(pageIndex);
    }
  }

  onLeftClick($event: any) {
    this.changeIndexStream.emit({indexPageOrigin: this.page.index, indexPageToExchange: this.page.index - 1});
    $event.stopPropagation();
  }

  onRightClick($event: any) {
    this.changeIndexStream.emit({indexPageOrigin: this.page.index, indexPageToExchange: this.page.index + 1});
    $event.stopPropagation();
  }

  onSwapPage(pageIndex: number) {
    this.changeIndexStream.emit({indexPageOrigin: this.page.index, indexPageToExchange: pageIndex});
  }

}
