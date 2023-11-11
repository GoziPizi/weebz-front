import { Component, OnInit, Input } from '@angular/core';
import { Page } from '../page';

@Component({
  selector: 'app-uploaded-page',
  templateUrl: './uploaded-page.component.html',
  styleUrls: ['./uploaded-page.component.scss']
})
export class UploadedPageComponent implements OnInit {

  @Input() page!: Page;

  constructor() { }

  ngOnInit(): void {
  }

}
