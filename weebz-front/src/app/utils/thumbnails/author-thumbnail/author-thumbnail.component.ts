import { Component, Input, OnInit } from '@angular/core';
import { Author } from 'src/app/models/author';
import { Router } from '@angular/router';

@Component({
  selector: 'app-author-thumbnail',
  templateUrl: './author-thumbnail.component.html',
  styleUrls: ['./author-thumbnail.component.scss']
})
export class AuthorThumbnailComponent implements OnInit {

  @Input() author: Author = new Author();

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  navigateToAuthor() {
    this.router.navigate(['/author', this.author.id]);
  }


  //getters for the template
  get name(): string {
    if(this.author == null) {
      return "";
    }
    return this.author.user.surname;
  }

  get image(): string {
    if(this.author == null) {
      return "../../../assets/profile_picture.png";
    }
    if(this.author.user.pictureUrl == null || this.author.user.pictureUrl == "") {
      return "../../../assets/profile_picture.png";
    }
    return this.author.user.pictureUrl;
  }
}
