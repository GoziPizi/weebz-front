import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiHandlerService } from '../../services/api-handler.service';
import { LoadingServiceService } from 'src/app/services/loading-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  @ViewChild('newPictureInput') fileInput!: ElementRef;

  logedIn = true;

  id:number = 0;

  name = "Name";
  surname = "Surname";
  email = "email";

  picture = "";
  showedPicture = "";
  newPicture: File = new File([""], "");
  newPictureSrc: string | ArrayBuffer | null = null;

  isPictureValid = true;
  pictureEdition = false;

  constructor(
    private api_handler: ApiHandlerService,
    private loadingService: LoadingServiceService,
    private router: Router
  )
  {
    this.api_handler.fetchUserData().subscribe((res: any) => {
      this.id = res.id;
      this.name = res.name;
      this.surname = res.surname;
      this.email = res.email;
      this.picture = res.pictureUrl;
      this.showedPicture = this.picture;
    },
    (err: any) => {
      this.logedIn = false;
      this.showErrorMessage();
    });
  }

  ngOnInit(): void {
  }

  showErrorMessage() {

  }

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event : any) {

    this.pictureEdition = true;

    const file = event.target.files[0];

    if(file) {
      this.newPicture = file;
      const img = new Image();
      img.onload = () => {
        const width = img.width;
        const height = img.height;
        console.log(width, height);
        if(width == height) {
          this.isPictureValid = true;
        } else {
          this.isPictureValid = false;
        }
      }
      let reader = new FileReader();
      reader.readAsDataURL(this.newPicture);
      reader.onload = (e:any) => {
        img.src = reader.result as string;
        this.newPictureSrc = reader.result;
        this.showedPicture = this.newPictureSrc as string;
      }
    }
  }

  updateProfilePicture() {
    this.loadingService.setLoadingState(true);
    this.api_handler.updateProfilePicture(this.newPicture).subscribe({
      next: (res: any) => {
        this.pictureEdition = false;
        this.showedPicture = this.picture;
        window.location.reload();
      },
      error: (err: any) => {
      },
      complete: () => {
        this.loadingService.setLoadingState(false);
      }
    })
  }
}
