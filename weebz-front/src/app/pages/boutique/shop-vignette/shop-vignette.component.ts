import { Component, Input, OnInit } from '@angular/core';
import { Shop } from 'src/app/models/shop';

@Component({
  selector: 'app-shop-vignette',
  templateUrl: './shop-vignette.component.html',
  styleUrls: ['./shop-vignette.component.scss']
})
export class ShopVignetteComponent implements OnInit {

  @Input() shop: Shop = new Shop();

  constructor() { }

  ngOnInit(): void {
  }

}
