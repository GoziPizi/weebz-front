import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { Artwork } from 'src/app/models/artwork';
import { Author } from 'src/app/models/author';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './search-header.component.html',
  styleUrl: './search-header.component.scss'
})
export class SearchHeaderComponent {

  searchTerm: string = '';
  private searchTerm$ = new Subject<string>();
  private searchResult$ = new BehaviorSubject<{artworks: any[], authors: any[]}>({artworks: [], authors: []});

  searchResultArtworks: Artwork[] = [];
  searchResultAuthors: Author[] = [];

  waitingForSearchResult: boolean = false;

  constructor(
    private searchService: SearchService,
    private router: Router
  ) {
    this.searchTerm$ = this.searchService.searchTerm;
    this.searchResult$ = this.searchService.searchResult;

    this.searchResult$.subscribe((res: any) => {
      this.handleSearchResult(res);
    });
  }

  onSearchTermChange() {
    if(this.searchTerm !== ''){
      this.searchTerm$.next(this.searchTerm);
      this.waitingForSearchResult = true;
      return;
    }
    this.waitingForSearchResult = false;
  }

  handleSearchResult(res: any) {
    this.waitingForSearchResult = false;
    this.searchResultArtworks = res.artworks.slice(0, 2);
    this.searchResultAuthors = res.authors.slice(0, 2);
  }

}
