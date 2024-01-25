import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiHandlerService } from '../../services/api-handler.service';
import { LoadingServiceService } from 'src/app/services/loading-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { BehaviorSubject } from 'rxjs';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  @ViewChild('newPictureInput') fileInput!: ElementRef;
  @ViewChild('newBackgroundInput') fileInputBackground!: ElementRef;

  logedIn = true;

  user$ = new BehaviorSubject<User>(new User());
  user: User = new User();

  showedPicture = "";
  newPicture: File = new File([""], "");
  newPictureSrc: string | ArrayBuffer | null = null;

  showedBackground = "";
  newBackground: File = new File([""], "");
  newBackgroundSrc: string | ArrayBuffer | null = null;

  isPictureValid = true;
  pictureEdition = false;

  isBackgroundValid = true;
  backgroundEdition = false;

  navigation = "compte";

  isMobile = this.deviceService.isMobile();

  constructor(
    private api_handler: ApiHandlerService,
    private loadingService: LoadingServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private deviceService: DeviceDetectorService
  )
  {
    this.api_handler.fetchUserData().subscribe({
      next: (res: any) => {
        this.user = res;
        this.user$.next(this.user);
        this.showedPicture = this.user.pictureUrl || "../../../assets/default_images/default_profile_picture.png";
        this.showedBackground = this.user.bannerUrl || "../../../assets/default_images/default_profil_banner.png";
      },
      error: (err: any) => {
        this.logedIn = false;
        this.router.navigate(['/connexion']);
      },
      complete: () => {
        this.loadingService.setLoadingState(false);
    }
    });
    this.route.queryParams.subscribe(params => {
      if(params['nav']) {
        this.navigation = params['nav'];
      }
    });
  }

  ngOnInit(): void {
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  triggerFileInputBackground() {
    this.fileInputBackground.nativeElement.click();
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

  onFileSelectedBackground(event : any) {

    this.backgroundEdition = true;

    const file = event.target.files[0];

    if(file) {
      this.newBackground = file;
      const img = new Image();
      img.onload = () => {
        const width = img.width;
        const height = img.height;
      }
      let reader = new FileReader();
      reader.readAsDataURL(this.newBackground);
      reader.onload = (e:any) => {
        img.src = reader.result as string;
        this.newBackgroundSrc = reader.result;
        this.showedBackground = this.newBackgroundSrc as string;
      }
    }
  }

  updateProfilePicture() {
    this.loadingService.setLoadingState(true);
    this.api_handler.updateProfilePicture(this.newPicture).subscribe({
      next: (res: any) => {
        this.pictureEdition = false;
        this.showedPicture = this.user.pictureUrl;
        window.location.reload();
      },
      error: (err: any) => {
      },
      complete: () => {
        this.loadingService.setLoadingState(false);
      }
    })
  }

  updateProfileBackground() {
    this.loadingService.setLoadingState(true);
    this.api_handler.updateProfileBackground(this.newBackground).subscribe({
      next: (res: any) => {
        this.pictureEdition = false;
        this.showedBackground = this.user.bannerUrl;
        window.location.reload();
      },
      error: (err: any) => {
      },
      complete: () => {
        this.loadingService.setLoadingState(false);
      }
    })
  }

  navigateTo(navigation: string) {
    this.navigation = navigation;
    this.router.navigate(['/my-profile'], { queryParams: { nav: navigation } });
  }
}
