import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Author } from 'src/app/models/author';

@Component({
  selector: 'app-author-presentation',
  templateUrl: './author-presentation.component.html',
  styleUrls: ['./author-presentation.component.scss']
})
export class AuthorPresentationComponent implements OnInit {

  @Input() author$ : Observable<Author> = new Observable<Author>();
  author: Author = new Author();

  constructor() { }

  ngOnInit(): void {
    this.author$.subscribe({
      next: (data: any) => {
        this.author = data;
      }
    })
  }

  //getters for the template
  get authorDescription() {
    if(this.author.id != undefined) {
      return this.author.presentation;
    }
    return "";
  }

}
