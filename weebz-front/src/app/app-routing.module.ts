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
import { AuteurComponent } from './pages/auteur/auteur.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { InscriptionComponent } from './pages/inscription/inscription.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'accueil', component: AccueilComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'catalogue', component: CatalogueComponent},
  { path: 'auteur/:auteur', component: AuteurComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'manga', component: MangaAccueilComponent},
  { path: 'webtoon', component: WebtoonAccueilComponent},
  { path: 'lightnovel', component: LightnovelAccueilComponent},
  { path: 'mangaview/:id', component: MangaViewComponent},
  { path: 'connexion', component: ConnexionComponent},
  { path: 'inscription', component: InscriptionComponent},
  { path: 'not-found', component: PageNotFoundComponent},
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },
  { path: '**', redirectTo: '/not-found'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
