import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-catalogue-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalogue-header.component.html',
  styleUrls: ['./catalogue-header.component.scss']
})
export class CatalogueHeaderComponent implements OnInit {

  @Input() categorie: string = 'manga';
  tag: string = 'all';
  searchTag: string = '';
  isMobile: boolean = this.deviceService.isMobile();
  isMobileMenuOpen: boolean = false;
  constructor(
    private router: Router,
    private deviceService: DeviceDetectorService
  ) { }

  ngOnInit(): void {
  }

  updateCategorie(categorie: string) {
    this.router.navigate([], {
      queryParams: { type: categorie },
      queryParamsHandling: 'merge'
    });
    this.categorie = categorie;
  }

  updateTag(tag: string) {
    this.router.navigate([], {
      queryParams: { tag: tag },
      queryParamsHandling: 'merge'
    });
    this.tag = tag;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  getDynamicStyles() {
    switch(this.categorie) {
      case 'defaut':
        return 'default-class';
      case 'manga':
        return 'manga-class';
      case 'webtoon':
        return 'webtoon-class';
      case 'lightnovel':
        return 'lightnovel-class';
      default: 
        return 'default-class';
    }
  }
}
