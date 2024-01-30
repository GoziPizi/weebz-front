import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

let routes: Routes = [
  { path: 'accueil', loadComponent: () => import('./pages/accueil/accueil.component').then(m => m.AccueilComponent)},
  { path: 'author/:authorId', loadComponent: () => import('./pages/auteur/auteur.component').then(m => m.AuteurComponent)},
  { path: 'artwork/:artworkId', loadComponent: () => import('./pages/artwork/artwork.component').then(m => m.ArtworkComponent)},
  { path: 'mangaview/:artworkId/:chapterId', loadComponent: () => import('./pages/manga-view/manga-view.component').then(m => m.MangaViewComponent)},
  { path: 'mobileview/:artworkId/:chapterId', loadComponent: () => import('./mobile/liseuse-mobile/liseuse-mobile.component').then(m => m.LiseuseMobileComponent)},
  { path: 'connexion', loadComponent: () => import('./pages/connexion/connexion.component').then(m => m.ConnexionComponent)},
  { path: 'inscription', loadComponent: () => import('./pages/inscription/inscription.component').then(m => m.InscriptionComponent)},
  { path: 'forgot-password', loadComponent: () => import('./pages/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent)},
  { path: 'reinit-password', loadComponent: () => import('./pages/reinit-password/reinit-password.component').then(m => m.ReinitPasswordComponent)},
  { path: 'my-profile', loadComponent: () => import('./pages/my-profile/my-profile.component').then(m => m.MyProfileComponent)},
  { path: 'watchlist', loadComponent: () => import('./pages/watchlist/watchlist.component').then(m => m.WatchlistComponent)},

  //news
  { path: 'weebz-arrive', loadComponent: () => import('./utils/carousel/weebz-arrive-page/weebz-arrive-page.component').then(m => m.WeebzArrivePageComponent)},
  { path: 'ink-house', loadComponent: () => import('./utils/carousel/ink-collab-page/ink-collab-page.component').then(m => m.InkCollabPageComponent)},
  { path: 'crise-du-papier', loadComponent: () => import('./utils/carousel/crise-papier-page/crise-papier-page.component').then(m => m.CrisePapierPageComponent)},
  { path: 'pslp', loadComponent: () => import('./utils/carousel/pslp-page/pslp-page.component').then(m => m.PslpPageComponent)},
  { path: 'ephjos-game', loadComponent: () => import('./utils/carousel/ephjos-game/ephjos-game.component').then(m => m.EphjosGameComponent)},

  //upload
  { path: 'upload', loadChildren: () => import('./modules/upload/upload.module').then(m => m.UploadModule)},

  //boutique
  { path: 'shop', loadComponent: () => import('./pages/boutique/all-boutique/all-boutique.component').then(m => m.AllBoutiqueComponent)},
  { path: 'shop/:shopId', loadComponent: () => import('./pages/boutique/accueil-boutique/accueil-boutique.component').then(m => m.AccueilBoutiqueComponent)},
  { path: 'product/:productId', loadComponent: () => import('./pages/boutique/page-produit/page-produit.component').then(m => m.PageProduitComponent)},
  { path: 'thank-you', loadComponent: () => import('./pages/boutique/thank-you/thank-you.component').then(m => m.ThankYouComponent)},

  //search
  { path: 'search', loadComponent: () => import('./pages/search/search-page/search-page.component').then(m => m.SearchPageComponent)},

  //utils
  { path: 'beta-enroll', loadComponent: () => import('./utils/beta/beta-page/beta-page.component').then(m => m.BetaPageComponent)},
  { path: 'tuto-upload', loadComponent: () => import('./pages/utils/how-to-upload-page/how-to-upload-page.component').then(m => m.HowToUploadPageComponent)},
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
