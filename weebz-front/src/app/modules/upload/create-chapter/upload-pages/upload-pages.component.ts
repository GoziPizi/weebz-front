import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
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
  changeIndexStream: 
    EventEmitter<{indexPageOrigin: number, indexPageToExchange: number}> 
    = new EventEmitter<{indexPageOrigin: number, indexPageToExchange: number}>();

  constructor() { }

  ngOnInit(): void {
    this.changeIndexStreamInit();
  }

  changeIndexStreamInit() {
    this.changeIndexStream.subscribe((change: {indexPageOrigin: number, indexPageToExchange: number}) => {
      const indexPageOrigin = change.indexPageOrigin;
      const indexPageToExchange = change.indexPageToExchange;
      const pageOrigin = this.pages.find(page => page.index === indexPageOrigin);
      const pageToExchange = this.pages.find(page => page.index === indexPageToExchange);
      if (pageOrigin && pageToExchange) {
        pageOrigin.index = indexPageToExchange;
        pageToExchange.index = indexPageOrigin;
        this.sortPages();
      }
    });
  }

  onDragOver(event : any) {
    event.preventDefault();
  }

  onDrop(event : any) {
    event.preventDefault();
    const files: File[] = event.dataTransfer.files;
    for (let i = 0; i < files.length; i++) {
      this.imageSubscription(files, i);
    }
  }

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    const orderedFiles = this.orderInputFiles(files);
    for (let i = 0; i < orderedFiles.length; i++) {
      this.imageSubscription(orderedFiles, i);
    }
    this.sortPages();
  }

  orderInputFiles(files: FileList) {
    // Convert FileList to array
    const fileArray = Array.from(files);
    // Sort the array based on the name property
    return fileArray.sort((a: File, b: File) => { 
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0; 
    });
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  imageSubscription(files: File[], i: number) {
    let reader = new FileReader();
    reader.readAsDataURL(files[i]);
    reader.onload = () => {
      const page:Page = {
        image: files[i],
        imageSrc: reader.result as string,
        index: this.extractLastNumber(files[i].name)
      }
      this.pages.push(page)
      this.sortPages();
    }
  }

  onDelete(index: number) {
    this.pages.splice(index - 1, 1);
    this.pages.forEach((page, index) => page.index = index + 1);
  }

  sortPages() {
    this.pages = this.pages.sort((a: Page, b: Page) => a.index - b.index);
  }

  getPageList() {
    this.pages.sort((a: Page, b: Page) => a.index - b.index);
    return this.pages;
  }

  extractLastNumber(str: string): number {
    const regex = /\d+/g;  // Le "g" à la fin permet de chercher globalement dans toute la chaîne
    const found = str.match(regex);
  
    if (found && found.length > 0) {
      // Prendre le dernier élément trouvé
      return parseInt(found[found.length - 1]);
    }
    return 0;
  }

}
