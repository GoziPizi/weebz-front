import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductVignetteComponent } from './product-vignette.component';

describe('ProductVignetteComponent', () => {
  let component: ProductVignetteComponent;
  let fixture: ComponentFixture<ProductVignetteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductVignetteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductVignetteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
