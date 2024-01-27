import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiHandlerService } from 'src/app/services/api-handler.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { LoadingServiceService } from 'src/app/services/loading-service.service';
import { UploadPagesComponent } from './upload-pages/upload-pages.component';


@Component({
  selector: 'app-create-chapter',
  templateUrl: './create-chapter.component.html',
  styleUrls: ['./create-chapter.component.scss']
})
export class CreateChapterComponent implements OnInit {

  @ViewChild('pagesUploadComponent') pagesUploadComponent!: UploadPagesComponent;
  @ViewChild('chapterCoverInput') chapterCoverInput!: any;
  //Artwork data
  artworkId: number = 0;
  title: string = "";
  coverUrl: string = "";
  backgroundUrl: string = "";
  chaptersNumber: number = 0;

  //Chapter data
  chapterCover: File = new File([""], "");
  chapterCoverUrl: string = "";

  //Upload utils
  pagesRemaining: number = 0;

  constructor(
    private apiHandler: ApiHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private loadingService: LoadingServiceService
  )
  {
    this.artworkId = Number(this.route.snapshot.paramMap.get('artworkId'));
    if(this.artworkId == 0) {
      this.router.navigate(['/']);
    }
    this.fetchArtworkData();
  }

  fetchArtworkData() {
    this.apiHandler.getArtwork(this.artworkId).subscribe((res: any) => {
      this.coverUrl = res.coverUrl;
      this.backgroundUrl = res.backgroundImageUrl;
      this.title = res.title;
    });
    this.apiHandler.getAllChapters(this.artworkId).subscribe({
      next: (res: any) => {
        this.chaptersNumber = res.length;
      },
      error: (error: any) => {
        this.chaptersNumber = 0;
      }
    })
  }

  ngOnInit(): void {
  }

  onDragOverChapterCover(event: any) {
    event.preventDefault();
  }

  onDropChapterCover(event: any) {
    event.preventDefault();
    this.chapterCover = event.dataTransfer.files[0];
    this.updateChapterCover();
  }

  updateChapterCover() {
    let reader = new FileReader();
    reader.readAsDataURL(this.chapterCover);
    reader.onload = () => {
      this.chapterCoverUrl = reader.result as string;
    }
  }

  triggerFileInputChapterCover() {
    this.chapterCoverInput.nativeElement.click();
  }

  onFileSelectedChapterCover(event: any) {
    this.chapterCover = event.target.files[0];
    this.updateChapterCover();
  }

  onSubmit() {
    this.loadingService.setLoadingState(true);
    let chapter = {
      title: this.title,
      cover: this.chapterCover,
      index: this.chaptersNumber+1
    }
    this.apiHandler.postChapter(chapter, this.artworkId).subscribe((res: any) => {
      const chapterId = res.id;
      this.postPages(chapterId);
    },
    (error: any) => {
      this.loadingService.setLoadingState(false);
    });
  }

  postPages(chapterId: number) {
    const pages = this.pagesUploadComponent.getPageList();
    for(let i = 0; i < pages.length; i++){
      let data = {
        page: pages[i].image,
        index: i+1
      }
      this.pagesRemaining++;
      this.apiHandler.postPage(data,this.artworkId, chapterId).subscribe((res:any) => {
        this.pagesRemaining--;
        if(this.pagesRemaining == 0){
          this.loadingService.setLoadingState(false);
          this.router.navigate(['/artwork', this.artworkId]);
        }
      })
    }
  }

}
