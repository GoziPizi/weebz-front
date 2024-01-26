import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileShopThumbnailComponent } from './mobile-shop-thumbnail.component';

describe('MobileShopThumbnailComponent', () => {
  let component: MobileShopThumbnailComponent;
  let fixture: ComponentFixture<MobileShopThumbnailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileShopThumbnailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MobileShopThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
