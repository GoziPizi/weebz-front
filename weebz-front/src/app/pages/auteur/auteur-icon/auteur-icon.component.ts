import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-auteur-icon',
  templateUrl: './auteur-icon.component.html',
  styleUrls: ['./auteur-icon.component.scss']
})
export class AuteurIconComponent implements OnInit {

  @Input() auteur: string|null = 'auteur';
  profilePicRoute: string = "../../../../assets/icon.png";

  constructor() { }

  ngOnInit(): void {
  }

}
