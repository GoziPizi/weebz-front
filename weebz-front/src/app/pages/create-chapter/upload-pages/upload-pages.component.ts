import { Component, OnInit } from '@angular/core';
import { Page } from '../page';

@Component({
  selector: 'app-upload-pages',
  templateUrl: './upload-pages.component.html',
  styleUrls: ['./upload-pages.component.scss']
})
export class UploadPagesComponent implements OnInit {

  pages: Page[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  onDragOver(event : any) {
    event.preventDefault();
  }

  onDrop(event : any) {
    event.preventDefault();
    const files: FileList = event.dataTransfer.files;
    for (let i = 0; i < files.length; i++) {
      this.imageSubscription(files, i);
    }
  }

  imageSubscription(files: FileList, i: number) {
    let reader = new FileReader();
    reader.readAsDataURL(files[i]);
    reader.onload = () => {
      const page:Page = {
        image: files[i],
        imageSrc: reader.result as string,
        index: this.pages.length + i + 1 //Index en comptage naturel
      }
      this.pages.push(page)
    }
  }

  getPageList() {
    return this.pages;
  }

}
