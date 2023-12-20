import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Author } from 'src/app/models/author';
import { Shop } from 'src/app/models/shop';

import { ApiHandlerService } from 'src/app/services/api-handler.service';

@Component({
  selector: 'app-author-shops',
  templateUrl: './author-shops.component.html',
  styleUrls: ['./author-shops.component.scss']
})
export class AuthorShopsComponent implements OnInit {

  @Input() author$: BehaviorSubject<any> = new BehaviorSubject<any>({});
  author: Author = new Author();

  shops: Shop[] = [];

  constructor(
    private apiHandler: ApiHandlerService
  ) { }

  ngOnInit(): void {
    this.author$.subscribe((data:any) => {
      this.author = data;
      if(Object.keys(this.author).length !== 0) {
        this.fetchShops();
      }
    });
  }

  fetchShops() {
    this.apiHandler.getShopsFromAuthor(this.author.id).subscribe({
      next: (data: any) => {
        this.shops = data;
      }
    })
  }

  //template getters
  get authorName() {
    if(this.author.user){
      return this.author.user.surname;
    }
    return "";
  }

}
