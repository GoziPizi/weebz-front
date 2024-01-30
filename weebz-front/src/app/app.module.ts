import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainHeaderComponent } from './main-header/main-header.component';
import { MainFooterComponent } from './main-footer/main-footer.component';
import { CookieService } from 'ngx-cookie-service';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { LoadingComponentComponent } from './utils/loading-component/loading-component.component';
import { AccueilWeebzNewsComponent } from './pages/accueil/accueil-weebz-news/accueil-weebz-news.component';
import { MonPanierComponent } from './pages/boutique/mon-panier/mon-panier.component';
import { RechercheBoutiqueComponent } from './pages/boutique/recherche-boutique/recherche-boutique.component';
import { ConnectedDropdownComponent } from './main-header/connected-dropdown/connected-dropdown.component';
import { ArtworkPreviewComponent } from './pages/auteur/author-artworks/artwork-preview/artwork-preview.component';
import { ShopVignetteComponent } from './pages/boutique/shop-vignette/shop-vignette.component';
import { WatchlistToastComponent } from './utils/toast/watchlist-toast/watchlist-toast.component';
import { ThankYouComponent } from './pages/boutique/thank-you/thank-you.component';
import { BetaHeaderComponent } from './utils/beta/beta-header/beta-header.component';
import { MobileHeaderComponent } from './mobile/header/header.component';


@NgModule({
  declarations: [
    AppComponent,
    MainHeaderComponent,
    MainFooterComponent,
    PageNotFoundComponent,
    LoadingComponentComponent,
    AccueilWeebzNewsComponent,
    MonPanierComponent,
    RechercheBoutiqueComponent,
    ConnectedDropdownComponent,
    ArtworkPreviewComponent,
    ShopVignetteComponent,
    WatchlistToastComponent,
    ThankYouComponent,
    BetaHeaderComponent,
    MobileHeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule { }
