import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auteur',
  templateUrl: './auteur.component.html',
  styleUrls: ['./auteur.component.scss']
})
export class AuteurComponent implements OnInit {

  auteur: string|null = 'auteur';
  profilePicRoute: string = "../../../assets/icon.png";
  bannerPicRoute: string = "../../../assets/test-news.png";
  description: string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies ultrices, nunc nisl aliquam nunc, vita";
  followers: number = 0;
  weebzers: number = 0;
  likes: number = 0;
  related_authors: string[] = ["1","2","3"];
  artworks: string[] = [];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.auteur = this.route.snapshot.paramMap.get('auteur');
  }

}
