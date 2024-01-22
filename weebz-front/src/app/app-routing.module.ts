import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { BlogComponent } from './pages/blog/blog.component';
import { CatalogueComponent } from './pages/catalogue/catalogue.component';
import { ContactComponent } from './pages/contact/contact.component';
import { MangaViewComponent } from './pages/manga-view/manga-view.component';
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
import { SearchPageComponent } from './pages/search/search-page/search-page.component';
import { HowToUploadPageComponent } from './pages/utils/how-to-upload-page/how-to-upload-page.component';
import { ThankYouComponent } from './pages/boutique/thank-you/thank-you.component';
import { AllBoutiqueComponent } from './pages/boutique/all-boutique/all-boutique.component';
import { ReglementComponent } from './pages/mentions-legales/reglement/reglement.component';
import { BetaPageComponent } from './utils/beta/beta-page/beta-page.component';
import { WeebzArrivePageComponent } from './utils/carousel/weebz-arrive-page/weebz-arrive-page.component';
import { InkCollabPageComponent } from './utils/carousel/ink-collab-page/ink-collab-page.component';
import { CrisePapierPageComponent } from './utils/carousel/crise-papier-page/crise-papier-page.component';
import { PslpPageComponent } from './utils/carousel/pslp-page/pslp-page.component';
import { ReinitPasswordComponent } from './pages/reinit-password/reinit-password.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ModifyArtworkComponent } from './pages/modify-pages/modify-artwork/modify-artwork.component';
import { CgvComponent } from './pages/mentions-legales/cgv/cgv.component';

let routes: Routes = [
  { path: 'accueil', component: AccueilComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'catalogue', component: CatalogueComponent},
  { path: 'author/:authorId', component: AuteurComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'artwork/:artworkId', component: ArtworkComponent},
  { path: 'mangaview/:artworkId/:chapterId', component: MangaViewComponent},
  { path: 'connexion', component: ConnexionComponent},
  { path: 'inscription', component: InscriptionComponent},
  { path: 'forgot-password', component: ForgotPasswordComponent},
  { path: 'reinit-password', component: ReinitPasswordComponent},
  { path: 'my-profile', component: MyProfileComponent},
  { path: 'watchlist', component: WatchlistComponent},

  //news
  { path: 'weebz-arrive', component: WeebzArrivePageComponent},
  { path: 'ink-house', component: InkCollabPageComponent},
  { path: 'crise-du-papier', component: CrisePapierPageComponent},
  { path: 'pslp', component: PslpPageComponent},

  //upload
  { path: 'create-artwork', component: CreateArtworkComponent},
  { path: 'create-chapter/:artworkId', component: CreateChapterComponent},
  { path: 'modify-artwork/:artworkId', component: ModifyArtworkComponent},

  //boutique
  { path: 'shop', component: AllBoutiqueComponent},
  { path: 'shop/:shopId', component: AccueilBoutiqueComponent},
  { path: 'product/:productId', component: PageProduitComponent},
  { path: 'thank-you', component: ThankYouComponent},

  //search
  { path: 'search', component: SearchPageComponent},

  //utils
  { path: 'beta-enroll', component: BetaPageComponent},
  { path: 'tuto-upload', component: HowToUploadPageComponent},
  { path: 'cgu', component: CguComponent},
  { path: 'cgv', component: CgvComponent},
  { path: 'reglement', component: ReglementComponent},
  { path: 'not-found', component: PageNotFoundComponent},
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },
  { path: '**', redirectTo: '/not-found'},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
