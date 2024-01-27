import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Artwork } from 'src/app/models/artwork';
import { ApiHandlerService } from 'src/app/services/api-handler.service';
import { LoadingServiceService } from 'src/app/services/loading-service.service';
import { ActivatedRoute } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';

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

  isMobile: boolean = this.deviceService.isMobile();

  constructor(
    private apiHandler: ApiHandlerService,
    private loadingService: LoadingServiceService,
    private route: ActivatedRoute,
    private deviceService: DeviceDetectorService,
    private titleService: Title,
    private metaService: Meta
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
    this.titleService.setTitle('Weebz - Recherche');
    this.metaService.updateTag({name: 'description', content: 'Trouve les meilleurs mangas, webtoons et light novels sur Weebz !'});
    this.metaService.updateTag({name: 'keywords', content: 'weebz, manga, webtoon, light novel, recherche, recherche manga, recherche webtoon, recherche light novel, recherche manga webtoon light novel, recherche manga webtoon light novel gratuit, recherche manga webtoon light novel gratuit en ligne, recherche manga webtoon light novel gratuit en ligne français'});
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
