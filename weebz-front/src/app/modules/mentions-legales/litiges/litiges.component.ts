import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-litiges',
  templateUrl: './litiges.component.html',
  styleUrl: './litiges.component.scss'
})
export class LitigesComponent {

  constructor(
    private titleService: Title,
    private meta: Meta
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Weebz - Litiges');
    this.meta.updateTag({ name: 'description', content: 'Weebz - Gestion des litiges' });
    this.meta.updateTag({ name: 'keywords', content: 'Weebz, litiges' });
  }

}
