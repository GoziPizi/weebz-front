import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainHeaderComponent } from './main-header/main-header.component';
import { MainFooterComponent } from './main-footer/main-footer.component';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { BlogComponent } from './pages/blog/blog.component';
import { CatalogueComponent } from './pages/catalogue/catalogue.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ContactFormComponent } from './pages/contact/contact-form/contact-form.component';
import { MangaAccueilComponent } from './pages/manga-accueil/manga-accueil.component';
import { WebtoonAccueilComponent } from './pages/webtoon-accueil/webtoon-accueil.component';
import { LightnovelAccueilComponent } from './pages/lightnovel-accueil/lightnovel-accueil.component';
import { MangaViewComponent } from './pages/manga-view/manga-view.component';
import { MangaLiseuseComponent } from './pages/manga-view/manga-liseuse/manga-liseuse.component';
import { CarouselAccueilMangaComponent } from './utils/carousel/carousel-accueil-manga/carousel-accueil-manga.component';
import { CarouselItemAccueilComponent } from './utils/carousel/carousel-item-accueil/carousel-item-accueil.component';

@NgModule({
  declarations: [
    AppComponent,
    MainHeaderComponent,
    MainFooterComponent,
    AccueilComponent,
    BlogComponent,
    CatalogueComponent,
    ContactComponent,
    ContactFormComponent,
    MangaAccueilComponent,
    WebtoonAccueilComponent,
    LightnovelAccueilComponent,
    MangaViewComponent,
    MangaLiseuseComponent,
    CarouselAccueilMangaComponent,
    CarouselItemAccueilComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
