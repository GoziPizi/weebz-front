import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingServiceService } from 'src/app/services/loading-service.service';
import { Router } from '@angular/router';

import { ApiHandlerService } from 'src/app/services/api-handler.service';
import { Chapter } from 'src/app/models/chapter';
import { forkJoin } from 'rxjs';
import { UploadPagesComponent } from '../../upload-pages/upload-pages.component';

@Component({
  selector: 'app-modify-chapter',
  templateUrl: './modify-chapter.component.html',
  styleUrl: './modify-chapter.component.scss'
})
export class ModifyChapterComponent {

  @ViewChild('chapterCoverInput') chapterCoverInput!: any;
  @ViewChild('pagesInput') pagesInput!: UploadPagesComponent;

  chapterId: number = 0;

  chapter: Chapter = new Chapter();
  isTitleEdited: boolean = false;

  isPagesEdited: boolean = false;
  isModalOpen: boolean = false;
  modaleText: string = 'Toutes les pages existantes de ce chapitre seront supprimées';

  newChapterCoverUrl: string = '';
  newChapterCover: File = new File([""], "");
  isEditingCover: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private apiHandler: ApiHandlerService,
    private loadingService: LoadingServiceService,
    private router: Router
  ) {
    this.route.params.subscribe(params => {
      this.chapterId = params['chapterId'];
    });
  }

  ngOnInit(): void {
    this.fetchChapter();
  }

  fetchChapter() {
    this.apiHandler.getChapterById(this.chapterId).subscribe({
      next: (result: Chapter) => {
        this.chapter = result;
      },
      error: (error) => {
      }
    })
  }

  onDeleteChapter() {
    this.loadingService.setLoadingState(true);
    this.apiHandler.deleteChapter(this.chapterId).subscribe({
      next: (result: any) => {
        this.loadingService.setLoadingState(false);
        this.router.navigate(['/modify-artwork', this.chapter.artworkId]);
      },
      error: (error) => {
        this.loadingService.setLoadingState(false);
      }
    })
  }

  onSubmit() {
    let observables = [];
    if(this.isTitleEdited) {
      observables.push(this.apiHandler.patchChapter({title: this.chapter.title}, this.chapterId));
    }
    if(this.isEditingCover) {
      observables.push(this.apiHandler.patchChapterCover({cover: this.newChapterCover}, this.chapterId));
    }
    if(this.isPagesEdited) {
      const pages = this.pagesInput.getPageList();
      for (let i = 0; i < pages.length; i++) {
        let data = { page: pages[i].image, index: i + 1 };
        observables.push(this.apiHandler.postPage(data, this.chapter.artworkId, this.chapterId));
      }
    }
    if(observables.length === 0) return;
    this.loadingService.setLoadingState(true);
    forkJoin(observables).subscribe({
      next: (result: any) => {
        this.loadingService.setLoadingState(false);
        this.router.navigate(['upload/modify-artwork', this.chapter.artworkId]);
      },
      error: (error) => {
        this.loadingService.setLoadingState(false);
      }
    })
  }

  submitChapter() {
    let data = {
      title: this.chapter.title,
    }
    this.apiHandler.patchChapter(data, this.chapterId).subscribe({
      next: (result: any) => {
        this.chapter = result;
      },
      error: (error) => {
      }
    })
  }

  submitChapterCover() {
    let data = {
      cover: this.newChapterCover
    }
    this.apiHandler.patchChapterCover(data, this.chapterId).subscribe({
      next: (result: any) => {
        this.chapter = result;
      },
      error: (error) => {
      }
    })
  }

  onLeaveChapterCoverEdit(event: any) {
    event.preventDefault();
    this.newChapterCover = new File([""], "");
    this.newChapterCoverUrl = '';
    event.preventDefault;
    this.isEditingCover = false;
  }

  onDragOverChapterCover(event: any) {
    event.preventDefault();
  }

  onDropChapterCover(event: any) {
    this.newChapterCover = event.dataTransfer.files[0];
  }

  updateChapterCover() {
    let reader = new FileReader();
    reader.readAsDataURL(this.newChapterCover);
    reader.onload = () => {
      this.newChapterCoverUrl = reader.result as string;
    }
  }

  triggerFileInputChapterCover() {
    this.chapterCoverInput.nativeElement.click();
  }

  onFileSelectedChapterCover(event: any) {
    this.isEditingCover = true;
    this.newChapterCover = event.target.files[0];
    this.updateChapterCover();
  }

  onEditTitle() {
    this.isTitleEdited = true;
  }

  onOpenModal() {
    this.isModalOpen = true;
  }

  onCloseModal() {
    this.isModalOpen = false;
  }

  onDeletePages() {
    this.isModalOpen = false;
    this.isPagesEdited = true;
    this.loadingService.setLoadingState(true);
    this.apiHandler.deleteChapterPages(this.chapterId).subscribe({
      next: (result: any) => {
        this.loadingService.setLoadingState(false);
      },
      error: (error: any) => {
        this.loadingService.setLoadingState(false);
        this.isPagesEdited = false;
      }
    })
  }

  get chapterCoverToShow() : string {
    if(this.newChapterCoverUrl === '') {
      return this.chapter.coverUrl
    }
    return this.newChapterCoverUrl;
  }
}
