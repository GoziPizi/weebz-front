import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourProductsShopThumbnailComponent } from './four-products-shop-thumbnail.component';

describe('FourProductsShopThumbnailComponent', () => {
  let component: FourProductsShopThumbnailComponent;
  let fixture: ComponentFixture<FourProductsShopThumbnailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FourProductsShopThumbnailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FourProductsShopThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
