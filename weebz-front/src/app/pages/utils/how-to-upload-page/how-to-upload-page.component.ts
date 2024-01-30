import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-how-to-upload-page',
  standalone: true,
  templateUrl: './how-to-upload-page.component.html',
  styleUrls: ['./how-to-upload-page.component.scss']
})
export class HowToUploadPageComponent implements OnInit {

  constructor(
    private title: Title,
    private meta: Meta
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Uploader - Weebz');
    this.meta.updateTag({ name: 'description', content: 'Comment uploader sur Weebz' });
    this.meta.updateTag({ keywords: 'weebz, upload, comment, uploader, manga, webtoon, japanimation, anime, scantrad, scan, trad, auteur, indépendant' });
  }

}
