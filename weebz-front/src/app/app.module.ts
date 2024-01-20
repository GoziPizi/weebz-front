import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainHeaderComponent } from './main-header/main-header.component';
import { MainFooterComponent } from './main-footer/main-footer.component';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { BlogComponent } from './pages/blog/blog.component';
import { CatalogueComponent } from './pages/catalogue/catalogue.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ContactFormComponent } from './pages/contact/contact-form/contact-form.component';
import { MangaViewComponent } from './pages/manga-view/manga-view.component';
import { MangaLiseuseComponent } from './pages/manga-view/manga-liseuse/manga-liseuse.component';
import { CarouselAccueilNewsComponent } from './utils/carousel/carousel-accueil-news/carousel-accueil-news.component';
import { CarouselNewsItemComponent } from './utils/carousel/carousel-accueil-news/carousel-news-item/carousel-news-item.component';
import { AuteurComponent } from './pages/auteur/auteur.component';
import { CatalogueHeaderComponent } from './utils/catalogue-header/catalogue-header.component';
import { CatalogueContentComponent } from './pages/catalogue/catalogue-content/catalogue-content.component';
import { CatalogueRowComponent } from './pages/catalogue/catalogue-content/catalogue-row/catalogue-row.component';
import { CatalogueItemComponent } from './pages/catalogue/catalogue-content/catalogue-item/catalogue-item.component';
import { MangaDoubleLiseuseComponent } from './pages/manga-view/manga-double-liseuse/manga-double-liseuse.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { InscriptionComponent } from './pages/inscription/inscription.component';
import { CookieService } from 'ngx-cookie-service';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { LoadingComponentComponent } from './utils/loading-component/loading-component.component';
import { ArtworkComponent } from './pages/artwork/artwork.component';
import { ChapterThumbnailComponent } from './utils/thumbnails/chapter-thumbnail/chapter-thumbnail.component';
import { ArtworkThumbnailComponent } from './utils/thumbnails/artwork-thumbnail/artwork-thumbnail.component';
import { WatchlistComponent } from './pages/watchlist/watchlist.component';
import { CreateArtworkComponent } from './pages/create-artwork/create-artwork.component';
import { CreateChapterComponent } from './pages/create-chapter/create-chapter.component';
import { UploadPagesComponent } from './pages/create-chapter/upload-pages/upload-pages.component';
import { UploadedPageComponent } from './pages/create-chapter/uploaded-page/uploaded-page.component';
import { AccueilWeebzNewsComponent } from './pages/accueil/accueil-weebz-news/accueil-weebz-news.component';
import { AccueilWeebzAuteursComponent } from './pages/accueil/accueil-weebz-auteurs/accueil-weebz-auteurs.component';
import { CguComponent } from './pages/mentions-legales/cgu/cgu.component';
import { AccueilBoutiqueComponent } from './pages/boutique/accueil-boutique/accueil-boutique.component';
import { PageProduitComponent } from './pages/boutique/page-produit/page-produit.component';
import { MonPanierComponent } from './pages/boutique/mon-panier/mon-panier.component';
import { AllBoutiqueComponent } from './pages/boutique/all-boutique/all-boutique.component';
import { RechercheBoutiqueComponent } from './pages/boutique/recherche-boutique/recherche-boutique.component';
import { ConnectedDropdownComponent } from './main-header/connected-dropdown/connected-dropdown.component';
import { CarouselArtworkComponent } from './pages/accueil/artwork-carousel/artwork-carousel.component';
import { ArtworkCarouselItemComponent } from './pages/accueil/artwork-carousel/artwork-carousel-item/artwork-carousel-item.component';
import { ProductVignetteComponent } from './pages/boutique/product-vignette/product-vignette.component';
import { AuthorArtworksComponent } from './pages/auteur/author-artworks/author-artworks.component';
import { ArtworkPreviewComponent } from './pages/auteur/author-artworks/artwork-preview/artwork-preview.component';
import { AuthorShopsComponent } from './pages/auteur/author-shops/author-shops.component';
import { ShopVignetteComponent } from './pages/boutique/shop-vignette/shop-vignette.component';
import { PageProduitSimilarProductComponent } from './pages/boutique/page-produit/page-produit-similar-product/page-produit-similar-product.component';
import { MyAccountGestionComponent } from './pages/my-profile/my-account-gestion/my-account-gestion.component';
import { MyArtworksGestionComponent } from './pages/my-profile/my-artworks-gestion/my-artworks-gestion.component';
import { CommentsDisplayerComponent } from './utils/comments/comments-displayer/comments-displayer.component';
import { SingleCommentComponent } from './utils/comments/comments-displayer/single-comment/single-comment.component';
import { CommentInputComponent } from './utils/comments/comment-input/comment-input.component';
import { SingleResponseComponent } from './utils/comments/comments-displayer/single-response/single-response.component';
import { NextChaptersForViewComponent } from './utils/navigation/next-chapters-for-view/next-chapters-for-view.component';
import { FourProductsShopThumbnailComponent } from './utils/thumbnails/shop-thumbnails/four-products-shop-thumbnail/four-products-shop-thumbnail.component';
import { MyShopsGestionComponent } from './pages/my-profile/my-shops-gestion/my-shops-gestion.component';
import { WatchlistToastComponent } from './utils/toast/watchlist-toast/watchlist-toast.component';
import { SearchPageComponent } from './pages/search/search-page/search-page.component';
import { AuthorPresentationComponent } from './pages/auteur/author-presentation/author-presentation.component';
import { HowToUploadPageComponent } from './pages/utils/how-to-upload-page/how-to-upload-page.component';
import { AuthorThumbnailComponent } from './utils/thumbnails/author-thumbnail/author-thumbnail.component';
import { MyShoppingCartComponent } from './utils/shop/my-shopping-cart/my-shopping-cart.component';
import { ShoppingCartItemComponent } from './utils/shop/my-shopping-cart/shopping-cart-item/shopping-cart-item.component';
import { ThankYouComponent } from './pages/boutique/thank-you/thank-you.component';
import { UnavailableOnMobileComponent } from './utils/unavailable-on-mobile/unavailable-on-mobile.component';
import { SocialsDisplayComponentComponent } from './utils/socials-display-component/socials-display-component.component';
import { BetaHeaderComponent } from './utils/beta/beta-header/beta-header.component';
import { BetaPageComponent } from './utils/beta/beta-page/beta-page.component';
import { ReinitPasswordComponent } from './pages/reinit-password/reinit-password.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { MyPreferencesGestionComponent } from './pages/my-profile/my-preferences-gestion/my-preferences-gestion.component';
import { MyOrdersGestionComponent } from './pages/my-profile/my-orders-gestion/my-orders-gestion.component';

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
    MangaViewComponent,
    MangaLiseuseComponent,
    CarouselAccueilNewsComponent,
    CarouselNewsItemComponent,
    AuteurComponent,
    CatalogueHeaderComponent,
    CatalogueContentComponent,
    CatalogueRowComponent,
    CatalogueItemComponent,
    MangaDoubleLiseuseComponent,
    ConnexionComponent,
    InscriptionComponent,
    PageNotFoundComponent,
    MyProfileComponent,
    LoadingComponentComponent,
    ArtworkComponent,
    ChapterThumbnailComponent,
    ArtworkThumbnailComponent,
    WatchlistComponent,
    CreateArtworkComponent,
    CreateChapterComponent,
    UploadPagesComponent,
    UploadedPageComponent,
    AccueilWeebzNewsComponent,
    AccueilWeebzAuteursComponent,
    CguComponent,
    AccueilBoutiqueComponent,
    PageProduitComponent,
    MonPanierComponent,
    AllBoutiqueComponent,
    RechercheBoutiqueComponent,
    ConnectedDropdownComponent,
    CarouselArtworkComponent,
    ArtworkCarouselItemComponent,
    ProductVignetteComponent,
    AuthorArtworksComponent,
    ArtworkPreviewComponent,
    AuthorShopsComponent,
    ShopVignetteComponent,
    PageProduitSimilarProductComponent,
    MyAccountGestionComponent,
    MyArtworksGestionComponent,
    CommentsDisplayerComponent,
    SingleCommentComponent,
    CommentInputComponent,
    SingleResponseComponent,
    NextChaptersForViewComponent,
    FourProductsShopThumbnailComponent,
    MyShopsGestionComponent,
    WatchlistToastComponent,
    SearchPageComponent,
    AuthorPresentationComponent,
    HowToUploadPageComponent,
    AuthorThumbnailComponent,
    MyShoppingCartComponent,
    ShoppingCartItemComponent,
    ThankYouComponent,
    UnavailableOnMobileComponent,
    SocialsDisplayComponentComponent,
    BetaHeaderComponent,
    BetaPageComponent,
    ReinitPasswordComponent,
    ForgotPasswordComponent,
    MyPreferencesGestionComponent,
    MyOrdersGestionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
