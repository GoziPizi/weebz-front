import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CguComponent } from "src/app/modules/mentions-legales/cgu/cgu.component";
import { CgvComponent } from "src/app/modules/mentions-legales/cgv/cgv.component";
import { ReglementComponent } from "src/app/modules/mentions-legales/reglement/reglement.component";

let routes: Routes = [
  { path: 'cgu', component: CguComponent},
  { path: 'cgv', component: CgvComponent},
  { path: 'reglement', component: ReglementComponent},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MentionsLegalesRoutingModule { }