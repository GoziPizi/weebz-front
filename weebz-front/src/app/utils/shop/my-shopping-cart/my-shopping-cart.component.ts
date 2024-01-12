import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { ProductWithQty } from 'src/app/models/productWithQty';
import { LoadingServiceService } from 'src/app/services/loading-service.service';
import { MondialRelayScriptLoadingService } from './mondial-relay-script-loading.service';
import { NgZone } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-my-shopping-cart',
  templateUrl: './my-shopping-cart.component.html',
  styleUrls: ['./my-shopping-cart.component.scss']
})
export class MyShoppingCartComponent implements OnInit {

  isCartOpen: boolean = false;

  productsWithQty: ProductWithQty[] = [];

  shoppingServiceSubscription: any;

  isShippingMondialRelay: boolean = false;
  selectMondialRelay: boolean = false;
  relayId: string = '';
  relayAdress: string = 'non sélectionné';

  constructor(
    public shoppingCartService: ShoppingCartService,
    public loadingService: LoadingServiceService,
    public scriptLoader: MondialRelayScriptLoadingService,
    private zone: NgZone
  ) { }

  ngOnInit(): void {
    this.shoppingServiceSubscription = this.shoppingCartService.getUpdateCartObservable().subscribe(() => {
      this.getProductsWithQty();
    });
  }

  ngOnDestroy(): void {
    this.shoppingServiceSubscription.unsubscribe();
  }

  getProductsWithQty() {
    this.productsWithQty = this.shoppingCartService.getCart();
  }

  //actions of the template
  openCart() {
    this.getProductsWithQty();
    this.isCartOpen = true;
  }

  closeCart() {
    this.isCartOpen = false;
  }

  onDomicileSelect() {
    this.isShippingMondialRelay = false;
  }

  onMondialRelaySelect() {
    this.isShippingMondialRelay = true;
    this.loadMondialRelayWidget();
  }

  loadMondialRelayWidget() {
    this.loadingService.setLoadingState(true);
    this.selectMondialRelay = true;
    this.scriptLoader.loadJQueryAndWidget(
      '//ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js',
      'https://widget.mondialrelay.com/parcelshop-picker/jquery.plugin.mondialrelay.parcelshoppicker.min.js'
    )
    .then(() => {
      this.loadingService.setLoadingState(false);
      $("#Zone_Widget").MR_ParcelShopPicker({
        Target: "#Retour_Widget",
        Brand: "CC230R43",
        Country: "FR", 
        Theme: "mondialrelay",
        OnParcelShopSelected: this.onParcelShopSelected.bind(this),
      });
    })
    .catch(error => {
      console.error('Script loading failed', error);
      this.loadingService.setLoadingState(false);
    });
  }

  onParcelShopSelected(data: any) {
    this.zone.run(() => {
      this.relayId = data.ID;
      this.relayAdress = data.Adresse1;
    });
  }

  closeMondialRelay() {
    this.selectMondialRelay = false;
  }

  onBuy() {
    this.loadingService.setLoadingState(true);
    const shippingMethod = this.isShippingMondialRelay ? 'relay' : 'standard';
    const relayInfo = {
      relayId: this.relayId,
      relayAdress: this.relayAdress
    };
    this.shoppingCartService.onBuy(shippingMethod,relayInfo).subscribe(() => {
      this.loadingService.setLoadingState(false);
      this.closeCart();
    });
  }

  getShippingPrice(): number {
    if (this.isShippingMondialRelay) {
      return 5.99;
    }
    return 6.99;
  }

  //getters 

  get totalPrice(): string {
    let total = 0;
    this.productsWithQty.forEach(p => {
      total += p.product.price * p.quantity;
    });
    total += this.getShippingPrice();
    return total.toFixed(2);
  }

}
