import { Component, OnInit } from '@angular/core';
import { Artwork } from 'src/app/models/artwork';
import { ApiHandlerService } from 'src/app/services/api-handler.service';
import { LoadingServiceService } from 'src/app/services/loading-service.service';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

  artworks: Artwork[] = [];
  categorie: string = 'manga';
  params: any;

  constructor(
    private apiHandler: ApiHandlerService,
    private loadingService: LoadingServiceService,
    private route: ActivatedRoute
  ) {
    //Param Subscription
    this.route.queryParams.subscribe({
      next: params => {
        this.categorie = params['categorie'] ? params['categorie'] : 'manga';
        this.params = params;
        this.searchArtworks();
      }
    })
  }

  ngOnInit(): void {
    
  }

  searchArtworks() {
    this.loadingService.setLoadingState(true);
    const finalParams = this.createParams();
    this.apiHandler.searchArtworks(finalParams).subscribe({
      next: res => {
        this.artworks = res;
        this.loadingService.setLoadingState(false);
      },
      error: err => {
        this.loadingService.setLoadingState(false);
      }
    })
  }

  /**
   * Create params for the search request
   * @returns params
   * 
   * title: string
   * author: string
   * tags: string[]
   * type: string[]
   * page: string
   * 
   */
  createParams() {
    let params = {};
    if(this.params['title']) {
      params = {...params, title: this.params['title']};
    }
    if(this.params['author']) {
      params = {...params, author: this.params['author']};
    }
    if(this.params['tags']) {
      params = {...params, tags: this.params['tags']};
    }
    if(this.params['type']=='manga' || !this.params['type']) {
      params = {...params, type: 'MANGA'};
    }
    if(this.params['type']=='webtoon') {
      params = {...params, type: 'COMIC'};
    }
    if(this.params['type']=='lightnovel') {
      params = {...params, type: 'NOVEL'};
    }
    if(this.params['page']) {
      params = {...params, page: this.params['page']};
    }
    return params;
  }

}
