import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileProductVignetteComponent } from './mobile-product-vignette.component';

describe('MobileProductVignetteComponent', () => {
  let component: MobileProductVignetteComponent;
  let fixture: ComponentFixture<MobileProductVignetteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileProductVignetteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MobileProductVignetteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
