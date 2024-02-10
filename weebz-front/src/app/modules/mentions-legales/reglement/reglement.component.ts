import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-reglement',
  templateUrl: './reglement.component.html',
  styleUrl: './reglement.component.scss'
})
export class ReglementComponent {

  constructor(
    private titleService: Title,
    private meta: Meta
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Weebz - Règlement');
    this.meta.updateTag({ name: 'description', content: 'Weebz - Conditions Règlement' });
    this.meta.updateTag({ name: 'keywords', content: 'Weebz, règlement' });
  }

}
