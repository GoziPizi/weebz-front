import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiHandlerService } from 'src/app/services/api-handler.service';
import { LoadingServiceService } from 'src/app/services/loading-service.service';
import { Router } from '@angular/router';

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

  type="MANGA";
  tags: string[] = [];

  title: string = "";
  description: string = "";

  isConnected: boolean = false;

  constructor(
    private apiHandler: ApiHandlerService,
    private loadingService: LoadingServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.apiHandler.isLoggedIn.subscribe((res: any) => {
      this.isConnected = res;
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

  setType(type: string) {
    this.type = type;
  }

  toggleTag(tag: string) {
    if (this.tags.includes(tag)) {
      this.tags.splice(this.tags.indexOf(tag), 1);
    } else {
      this.tags.push(tag);
    }
  }

  onValidate() {
    this.loadingService.setLoadingState(true);
    let data = {
      title: this.title,
      description: this.description,
      type: this.type,
      cover: this.cover,
      background: this.background,
      tags: this.tags
    }
    this.apiHandler.postArtwork(data).subscribe((res:any) => {
      this.loadingService.setLoadingState(false);
      const id = res.id;
      this.router.navigate(['/create-chapter/' + id]);
    });
  }
}
