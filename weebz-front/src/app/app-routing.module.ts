import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { BlogComponent } from './pages/blog/blog.component';
import { CatalogueComponent } from './pages/catalogue/catalogue.component';

const routes: Routes = [
  { path: 'accueil', component: AccueilComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'catalogue', component: CatalogueComponent},
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
