import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CgvComponent } from 'src/app/modules/mentions-legales/cgv/cgv.component';
import { CguComponent } from 'src/app/modules/mentions-legales/cgu/cgu.component';
import { ReglementComponent } from 'src/app/modules/mentions-legales/reglement/reglement.component';
import { MentionsLegalesRoutingModule } from './mentions-legales-routing.module';



@NgModule({
  declarations: [
    CgvComponent,
    CguComponent,
    ReglementComponent
  ],
  imports: [
    CommonModule,
    MentionsLegalesRoutingModule
  ]
})
export class MentionsLegalesModule { }
