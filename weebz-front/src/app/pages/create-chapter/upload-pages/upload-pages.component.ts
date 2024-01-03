import { Component, OnInit, ViewChild } from '@angular/core';
import { Page } from '../page';

@Component({
  selector: 'app-upload-pages',
  templateUrl: './upload-pages.component.html',
  styleUrls: ['./upload-pages.component.scss']
})
export class UploadPagesComponent implements OnInit {

  //Component to handle the pages of a chapter.
  //This component is used in the create-chapter component.
  //This component is used to upload the pages of a chapter.
  //The pages array is used to store the pages of a chapter, each page knows its index in the chapter.

  @ViewChild('fileInput') fileInput!: any;
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

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      this.imageSubscription(files, i);
    }
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  imageSubscription(files: FileList, i: number) {
    let reader = new FileReader();
    reader.readAsDataURL(files[i]);
    reader.onload = () => {
      const page:Page = {
        image: files[i],
        imageSrc: reader.result as string,
        index: this.pages.length + 1 //Index en comptage naturel
      }
      this.pages.push(page)
    }
  }

  onDelete(index: number) {
    this.pages.splice(index - 1, 1);
    this.pages.forEach((page, index) => page.index = index + 1);
  }

  getPageList() {
    this.pages.sort((a: Page, b: Page) => a.index - b.index);
    return this.pages;
  }

}
