import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CguComponent } from "src/app/modules/mentions-legales/cgu/cgu.component";
import { CgvComponent } from "src/app/modules/mentions-legales/cgv/cgv.component";
import { ReglementComponent } from "src/app/modules/mentions-legales/reglement/reglement.component";
import { LitigesComponent } from "./litiges/litiges.component";

let routes: Routes = [
  { path: 'cgu', component: CguComponent},
  { path: 'cgv', component: CgvComponent},
  { path: 'litiges', component: LitigesComponent},
  { path: 'reglement', component: ReglementComponent},
  { path: '', redirectTo: 'cgu', pathMatch: 'full'}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MentionsLegalesRoutingModule { }