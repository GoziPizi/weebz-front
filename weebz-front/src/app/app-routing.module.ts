import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { BlogComponent } from './pages/blog/blog.component';
import { CatalogueComponent } from './pages/catalogue/catalogue.component';
import { ContactComponent } from './pages/contact/contact.component';
import { MangaAccueilComponent } from './pages/manga-accueil/manga-accueil.component';
import { WebtoonAccueilComponent } from './pages/webtoon-accueil/webtoon-accueil.component';
import { LightnovelAccueilComponent } from './pages/lightnovel-accueil/lightnovel-accueil.component';
import { MangaViewComponent } from './pages/manga-view/manga-view.component';
import { WebtoonViewComponent } from './pages/webtoon-view/webtoon-view.component';
import { AuteurComponent } from './pages/auteur/auteur.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { InscriptionComponent } from './pages/inscription/inscription.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { ArtworkComponent } from './pages/artwork/artwork.component';
import { WatchlistComponent } from './pages/watchlist/watchlist.component';
import { CreateArtworkComponent } from './pages/create-artwork/create-artwork.component';
import { CreateChapterComponent } from './pages/create-chapter/create-chapter.component';
import { CguComponent } from './pages/mentions-legales/cgu/cgu.component';
import { PageProduitComponent } from './pages/boutique/page-produit/page-produit.component';
import { AccueilBoutiqueComponent } from './pages/boutique/accueil-boutique/accueil-boutique.component';

let routes: Routes = [
  { path: 'accueil', component: AccueilComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'catalogue', component: CatalogueComponent},
  { path: 'author/:authorId', component: AuteurComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'manga', component: MangaAccueilComponent},
  { path: 'webtoon', component: WebtoonAccueilComponent},
  { path: 'lightnovel', component: LightnovelAccueilComponent},
  { path: 'artwork/:artworkId', component: ArtworkComponent},
  { path: 'mangaview/:artworkId/:chapterId', component: MangaViewComponent},
  { path: 'webtoonview/:artworkId/:chapterId', component: WebtoonViewComponent},
  { path: 'connexion', component: ConnexionComponent},
  { path: 'inscription', component: InscriptionComponent},
  { path: 'my-profile', component: MyProfileComponent},
  { path: 'watchlist', component: WatchlistComponent},
  { path: 'create-artwork', component: CreateArtworkComponent},
  { path: 'create-chapter/:artworkId', component: CreateChapterComponent},
  { path: 'shop/:shopId', component: AccueilBoutiqueComponent},
  { path: 'product/:productId', component: PageProduitComponent},
  { path: 'cgu', component: CguComponent},
  { path: 'not-found', component: PageNotFoundComponent},
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },
  { path: '**', redirectTo: '/not-found'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
