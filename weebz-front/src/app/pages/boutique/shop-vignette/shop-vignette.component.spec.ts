import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopVignetteComponent } from './shop-vignette.component';

describe('ShopVignetteComponent', () => {
  let component: ShopVignetteComponent;
  let fixture: ComponentFixture<ShopVignetteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopVignetteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopVignetteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
