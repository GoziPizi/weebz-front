import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-socials-display-component',
  templateUrl: './socials-display-component.component.html',
  styleUrl: './socials-display-component.component.scss'
})
export class SocialsDisplayComponentComponent {

  @Input() socials: string[] = [];

  insta: boolean = false;
  tiktok: boolean = false;
  x: boolean = false;
  threads: boolean = false;

  constructor() {
    this.updateSocials(this.socials);
  }

  updateSocials(socials: string[] = this.socials){
    this.socials = socials;
    this.insta = false;
    this.tiktok = false;
    this.x = false;
    this.threads = false;
    this.socials.forEach(url => {
      this.findSocial(url);
    })
  }

  findSocial(url: string){
    if(url.includes("instagram.com")) this.insta = true;
    if(url.includes("tiktok.com")) this.tiktok = true;
    if(url.includes("x.com")) this.x = true;
    if(url.includes("threads.com")) this.threads = true;
  }

  onNavigate(social_name: string){
    const url = this.socials.find(url => url.includes(social_name));
    window.open(url, "_blank");
  }

}
