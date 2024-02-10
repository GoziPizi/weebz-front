import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-cgv',
  templateUrl: './cgv.component.html',
  styleUrl: './cgv.component.scss'
})
export class CgvComponent {

  constructor(
    private titleService: Title,
    private meta: Meta
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Weebz - Conditions Générales de vente)');
    this.meta.updateTag({ name: 'description', content: 'Weebz - Conditions Générales de vente' });
    this.meta.updateTag({ name: 'keywords', content: 'Weebz, conditions, vente, condition' });
  }

}
