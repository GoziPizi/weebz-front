import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiHandlerService } from 'src/app/services/api-handler.service';
import { LoadingServiceService } from 'src/app/services/loading-service.service';

@Component({
  selector: 'app-create-artwork',
  templateUrl: './create-artwork.component.html',
  styleUrls: ['./create-artwork.component.scss']
})
export class CreateArtworkComponent implements OnInit {

  @ViewChild('fileCoverInput') fileCoverInput!: ElementRef;
  @ViewChild('fileBackgroundInput') fileBackgroundInput!: ElementRef;

  cover: File = new File([""], "");
  coverPreviewSrc: string | ArrayBuffer | null = null;

  background: File = new File([""], "");
  backgroundPreviewSrc: string | ArrayBuffer | null = null;

  isMangaSelected: boolean = true;
  isWebtoonSelected: boolean = false;
  isLightNovelSelected: boolean = false;

  title: string = "";
  description: string = "";

  constructor(
    private apiHandler: ApiHandlerService,
    private loadingService: LoadingServiceService
  ) { }

  onDragOver(event : any) {
    event.preventDefault();
  }

  onDropCover(event : any) {
    event.preventDefault();
    this.cover = event.dataTransfer.files[0];
    this.updateCoverPreview();
  }

  triggerFileInputCover() {
    this.fileCoverInput.nativeElement.click();
  }

  onFileSelectedCover(event : any) {
    this.cover = event.target.files[0];
    this.updateCoverPreview();
  }

  updateCoverPreview() {
    let reader = new FileReader();
    reader.readAsDataURL(this.cover);
    reader.onload = () => {
      this.coverPreviewSrc = reader.result;
    }
  }

  onDropBackground(event : any) {
    event.preventDefault();
    this.background = event.dataTransfer.files[0];
    this.updateBackgroundPreview();
  }

  triggerFileInputBackground() {
    this.fileBackgroundInput.nativeElement.click();
  }

  onFileSelectedBackground(event : any) {
    this.background = event.target.files[0];
    this.updateBackgroundPreview();
  }

  updateBackgroundPreview() {
    let reader = new FileReader();
    reader.readAsDataURL(this.background);
    reader.onload = () => {
      this.backgroundPreviewSrc = reader.result;
    }
  }

  onMangaClick() {
    this.isMangaSelected = true;
    this.isWebtoonSelected = false;
    this.isLightNovelSelected = false;
  }

  onWebtoonClick() {
    this.isMangaSelected = false;
    this.isWebtoonSelected = true;
    this.isLightNovelSelected = false;
  }

  onLightNovelClick() {
    this.isMangaSelected = false;
    this.isWebtoonSelected = false;
    this.isLightNovelSelected = true;
  }

  ngOnInit(): void {
  }

  onValidate() {
    this.loadingService.setLoadingState(true);
    let type = "";
    if(this.isLightNovelSelected){
      type = "LIGHTNOVEL";
    }
    else if(this.isWebtoonSelected){
      type = "WEBTOON";
    }
    else if(this.isMangaSelected){
      type = "MANGA";
    let data = {
      title: this.title,
      description: this.description,
      type: type,
      cover: this.cover,
      background: this.background
    }
    this.apiHandler.postArtwork(data).subscribe((res:any) => {
      this.loadingService.setLoadingState(false);
    });
  }
  }
}
