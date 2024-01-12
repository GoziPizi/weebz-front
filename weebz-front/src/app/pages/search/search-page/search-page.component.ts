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
  tag: string = 'all';
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
        this.tag = params['tag'] ? params['tag'] : 'all';
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
    let finalParams = {};
    if(this.params['title']) {
      finalParams = {...finalParams, title: this.params['title']};
    }
    if(this.params['author']) {
      finalParams = {...finalParams, author: this.params['author']};
    }
    if(this.tag!='all') {
      finalParams = {...finalParams, tags: [this.tag]};
    }
    if(this.params['type']=='manga' || !this.params['type']) {
      finalParams = {...finalParams, type: 'MANGA'};
    }
    if(this.params['type']=='webtoon') {
      finalParams = {...finalParams, type: 'COMIC'};
    }
    if(this.params['type']=='lightnovel') {
      finalParams = {...finalParams, type: 'NOVEL'};
    }
    if(this.params['page']) {
      finalParams = {...finalParams, page: this.params['page']};
    }
    return finalParams;
  }

}
