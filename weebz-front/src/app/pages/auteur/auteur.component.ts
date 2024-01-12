import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Author } from 'src/app/models/author';
import { ApiHandlerService } from 'src/app/services/api-handler.service';
import { SocialsDisplayComponentComponent } from 'src/app/utils/socials-display-component/socials-display-component.component';

@Component({
  selector: 'app-auteur',
  templateUrl: './auteur.component.html',
  styleUrls: ['./auteur.component.scss']
})
export class AuteurComponent implements OnInit {

  //Components child
  @ViewChild('socialsDisplay') socialsDisplay!: SocialsDisplayComponentComponent;

  authorId: number = 0;
  author: Author = new Author();

  //Observable sur l'auteur pour les child components
  author$: BehaviorSubject<any> = new BehaviorSubject<any>({});

  followed: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private apiHandler: ApiHandlerService
  ) { }

  ngOnInit(): void {
    this.authorId = Number(this.route.snapshot.paramMap.get('authorId'));
    this.fetchAuthorData();
  }

  fetchAuthorData() {
    if(this.authorId == 0) return;
    this.apiHandler.getAuthorData(this.authorId).subscribe({
      next: (data: any) => {
        this.author = data;
        this.socialsDisplay.updateSocials(this.author.socialNetworks);
        this.author$.next(data);
      }
    }
    )
  }

  //Events of the template

  scrollToView(id: string) {
    let el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
  }

  //getters for the template

  get authorName() {
    if (this.author.user.id == 0) {
      return "";
    }
    return this.author.user.surname;
  }

  get authorPicture() {
    if (this.author.user.id == 0) {
      return "";
    }
    return this.author.user.pictureUrl;
  }

  get presentation() {
    if (this.author.user.id == 0) {
      return "";
    }
    return this.author.presentation;
  }

  get banner() {
    if (this.author.user.id == 0 || this.author.user.bannerUrl == "" || this.author.user.bannerUrl == null) {
      return "../../assets/default_images/default_profil_banner.png";
    }
    return this.author.user.bannerUrl;
  }
}
