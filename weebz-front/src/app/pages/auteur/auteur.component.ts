import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ApiHandlerService } from 'src/app/services/api-handler.service';

@Component({
  selector: 'app-auteur',
  templateUrl: './auteur.component.html',
  styleUrls: ['./auteur.component.scss']
})
export class AuteurComponent implements OnInit {

  authorId: number = 0;
  author: any = {};

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
        this.author$.next(data);
      }
    }
    )
  }

  //Events of the template

  onFollow() {
    this.followed = !this.followed;
  }


  //getters for the template

  get authorName() {
    if (Object.keys(this.author).length === 0) {
      return "";
    }
    return this.author.user.surname;
  }

  get authorPicture() {
    if (Object.keys(this.author).length === 0) {
      return "";
    }
    return this.author.user.pictureUrl;
  }

  get presentation() {
    if (Object.keys(this.author).length === 0) {
      return "";
    }
    return this.author.presentation;
  }

}
