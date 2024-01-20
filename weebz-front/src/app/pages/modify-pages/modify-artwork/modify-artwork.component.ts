import { Component, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiHandlerService } from 'src/app/services/api-handler.service';
import { LoadingServiceService } from 'src/app/services/loading-service.service';

import { Artwork } from 'src/app/models/artwork';


@Component({
  selector: 'app-modify-artwork',
  templateUrl: './modify-artwork.component.html',
  styleUrl: './modify-artwork.component.scss'
})
export class ModifyArtworkComponent {

  artworkId: number = 0;
  artwork: Artwork = new Artwork();

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
    private route: ActivatedRoute,
    private apiHandler: ApiHandlerService,
    private router: Router,
    private loadingService: LoadingServiceService
  )
  {
    this.route.paramMap.subscribe(params => {
      this.artworkId = Number(params.get('artworkId'));
    })
  }

  ngOnInit(): void {
    this.apiHandler.getArtwork(this.artworkId).subscribe((res: any) => {
      this.artwork = res;
      this.title = this.artwork.title;
      this.description = this.artwork.description;
      this.coverPreviewSrc = this.artwork.coverUrl;
      this.backgroundPreviewSrc = this.artwork.backgroundImageUrl;
    });
  }

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

  onValidate() {
    this.loadingService.setLoadingState(true);
    let type = "";
    if(this.isLightNovelSelected){
      type = "NOVEL";
    }
    else if(this.isWebtoonSelected){
      type = "COMIC";
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
    this.apiHandler.putArtwork(data, this.artworkId).subscribe((res:any) => {
      this.loadingService.setLoadingState(false);
      this.router.navigate(['/my-profile']);
    });
  }
  }

}
