import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.scss']
})
export class ThankYouComponent implements OnInit {

  constructor(
    private router: Router,
    private shoppingCartService: ShoppingCartService
  ) { }

  ngOnInit(): void {
    this.clearCart();
    //wait 5 seconds then redirect to home
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 5000);
  }

  clearCart() {
    this.shoppingCartService.clearCart();
  }

}
