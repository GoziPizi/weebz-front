import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { ContactComponent } from './pages/contact/contact.component';
import { MangaViewComponent } from './pages/manga-view/manga-view.component';
import { AuteurComponent } from './pages/auteur/auteur.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { InscriptionComponent } from './pages/inscription/inscription.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { ArtworkComponent } from './pages/artwork/artwork.component';
import { WatchlistComponent } from './pages/watchlist/watchlist.component';
import { PageProduitComponent } from './pages/boutique/page-produit/page-produit.component';
import { AccueilBoutiqueComponent } from './pages/boutique/accueil-boutique/accueil-boutique.component';
import { SearchPageComponent } from './pages/search/search-page/search-page.component';
import { HowToUploadPageComponent } from './pages/utils/how-to-upload-page/how-to-upload-page.component';
import { ThankYouComponent } from './pages/boutique/thank-you/thank-you.component';
import { AllBoutiqueComponent } from './pages/boutique/all-boutique/all-boutique.component';
import { BetaPageComponent } from './utils/beta/beta-page/beta-page.component';
import { WeebzArrivePageComponent } from './utils/carousel/weebz-arrive-page/weebz-arrive-page.component';
import { InkCollabPageComponent } from './utils/carousel/ink-collab-page/ink-collab-page.component';
import { CrisePapierPageComponent } from './utils/carousel/crise-papier-page/crise-papier-page.component';
import { PslpPageComponent } from './utils/carousel/pslp-page/pslp-page.component';
import { ReinitPasswordComponent } from './pages/reinit-password/reinit-password.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { LiseuseMobileComponent } from './mobile/liseuse-mobile/liseuse-mobile.component';
import { EphjosGameComponent } from './utils/carousel/ephjos-game/ephjos-game.component';

let routes: Routes = [
  { path: 'accueil', component: AccueilComponent },
  { path: 'author/:authorId', component: AuteurComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'artwork/:artworkId', component: ArtworkComponent},
  { path: 'mangaview/:artworkId/:chapterId', component: MangaViewComponent},
  { path: 'mobileview/:artworkId/:chapterId', component: LiseuseMobileComponent},
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
  { path: 'ephjos-game', component: EphjosGameComponent},

  //upload
  { path: 'upload', loadChildren: () => import('./modules/upload/upload.module').then(m => m.UploadModule)},

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
  { path: 'mentions-legales', loadChildren: () => import('./modules/mentions-legales/mentions-legales.module').then(m => m.MentionsLegalesModule)},
  { path: 'not-found', component: PageNotFoundComponent},
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },
  { path: '**', redirectTo: '/not-found'},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
