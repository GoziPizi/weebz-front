import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Artwork } from 'src/app/models/artwork';
import { ApiHandlerService } from 'src/app/services/api-handler.service';
import { LoadingServiceService } from 'src/app/services/loading-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ArtworkThumbnailComponent } from 'src/app/utils/thumbnails/artwork-thumbnail/artwork-thumbnail.component';
import { CatalogueHeaderComponent } from 'src/app/utils/catalogue-header/catalogue-header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ArtworkThumbnailComponent, CatalogueHeaderComponent],
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

  artworks: Artwork[] = [];
  categorie: string = 'manga';
  tag: string = 'all';
  searchTerm: string = '';
  params: any;

  isMobile: boolean = this.deviceService.isMobile();

  constructor(
    private apiHandler: ApiHandlerService,
    private loadingService: LoadingServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private deviceService: DeviceDetectorService,
    private titleService: Title,
    private metaService: Meta
  ) {
    //Param Subscription
    this.route.queryParams.subscribe({
      next: params => {
        this.categorie = params['categorie'] ? params['categorie'] : 'manga';
        this.tag = params['tag'] ? params['tag'] : 'all';
        this.searchTerm = params['searchTerm'] ? params['searchTerm'] : '';
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

  updateSearchTerm() {
    this.router.navigate([], {
      queryParams: { searchTerm: this.searchTerm },
      queryParamsHandling: 'merge'
    });
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

  onInputKeyDown(event: any) {
    if(event.key === 'Enter') {
      this.updateSearchTerm();
    }
  }

  /**
   * Create params for the search request
   * @returns params
   * 
   * searchTerm: string
   * author: string
   * tags: string[]
   * type: string[]
   * page: string
   * 
   */
  createParams() {
    let finalParams = {};
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
    if(this.searchTerm || this.searchTerm!='') {
      finalParams = {...finalParams, searchTerm: this.searchTerm};
    }
    console.log(finalParams);
    return finalParams;
  }

}
