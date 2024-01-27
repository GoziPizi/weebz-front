import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateArtworkComponent } from 'src/app/pages/create-artwork/create-artwork.component';
import { ModifyArtworkComponent } from 'src/app/pages/modify-pages/modify-artwork/modify-artwork.component';
import { CreateChapterComponent } from 'src/app/pages/create-chapter/create-chapter.component';
import { ModifyChapterComponent } from 'src/app/pages/modify-pages/modify-chapter/modify-chapter.component';
import { FormsModule } from '@angular/forms';
import { UploadPagesComponent } from 'src/app/pages/create-chapter/upload-pages/upload-pages.component';
import { UploadedPageComponent } from 'src/app/pages/create-chapter/uploaded-page/uploaded-page.component';
import { UploadRoutingModule } from './upload-routing.module';



@NgModule({
  declarations: [
    CreateArtworkComponent,
    ModifyArtworkComponent,
    CreateChapterComponent,
    ModifyChapterComponent,
    UploadPagesComponent,
    UploadedPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    UploadRoutingModule
  ]
})
export class UploadModule { }
