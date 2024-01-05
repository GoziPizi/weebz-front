import { Component, OnInit } from '@angular/core';
import { Author } from 'src/app/models/author';
import { ApiHandlerService } from 'src/app/services/api-handler.service';


@Component({
  selector: 'app-accueil-weebz-auteurs',
  templateUrl: './accueil-weebz-auteurs.component.html',
  styleUrls: ['./accueil-weebz-auteurs.component.scss']
})
export class AccueilWeebzAuteursComponent implements OnInit {

  authors: Author[] = [];

  constructor(
    private apiHandler: ApiHandlerService
  ) { }

  ngOnInit(): void {
    this.fetchAuthors();
  }

  fetchAuthors(): void {
    this.apiHandler.getAuthorsHomepage().subscribe(
      (authors: Author[]) => {
        //Only take the first 5 authors
        this.authors = authors.slice(0, 5);
      }
    );
  }

}
