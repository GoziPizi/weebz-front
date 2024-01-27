import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateArtworkComponent } from "src/app/pages/create-artwork/create-artwork.component";
import { CreateChapterComponent } from "src/app/pages/create-chapter/create-chapter.component";
import { ModifyArtworkComponent } from "src/app/pages/modify-pages/modify-artwork/modify-artwork.component";
import { ModifyChapterComponent } from "src/app/pages/modify-pages/modify-chapter/modify-chapter.component";

let routes: Routes = [
  { path: 'create-artwork', component: CreateArtworkComponent},
  { path: 'create-chapter/:artworkId', component: CreateChapterComponent},
  { path: 'modify-artwork/:artworkId', component: ModifyArtworkComponent},
  { path: 'modify-chapter/:chapterId', component: ModifyChapterComponent},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadRoutingModule { }