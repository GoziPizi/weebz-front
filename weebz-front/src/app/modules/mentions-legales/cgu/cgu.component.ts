import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-cgu',
  templateUrl: './cgu.component.html',
  styleUrls: ['./cgu.component.scss']
})
export class CguComponent implements OnInit {

  constructor(
    private titleService: Title,
    private meta: Meta
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Weebz - Conditions Générales d\'Utilisation');
    this.meta.updateTag({ name: 'description', content: 'Weebz - Conditions Générales d\'Utilisation' });
    this.meta.updateTag({ name: 'keywords', content: 'Weebz, Conditions Générales d\'Utilisation, conditions, utilisation, règlement' });
  }

}
