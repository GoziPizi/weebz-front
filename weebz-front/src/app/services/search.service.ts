import { Injectable } from '@angular/core';
import { ApiHandlerService } from './api-handler.service';
import { Artwork } from '../models/artwork';
import { Author } from '../models/author';
import { BehaviorSubject, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SearchService {

  artworks: Artwork[] = [];
  authors: Author[] = [];

  public searchTerm = new Subject<string>();
  public searchResult = new BehaviorSubject<{artworks: Artwork[], authors: Author[]}>({artworks: [], authors: []});

  constructor(
    private apiHandler: ApiHandlerService
  ) {
    this.searchTerm.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.apiHandler.similaritySearch(term))
    ).subscribe((res: any) => {
      this.artworks = res.artworks;
      this.authors = res.authors;
      this.searchResult.next({artworks: this.artworks, authors: this.authors});
    });
  }
}
